import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import { queryClient } from 'infra/cache/react-query'
import { AxiosHttpClient } from 'infra/http/axios-http-client/axios-http-client'
import { UserContext } from 'presentation/context/UserContext'
import { useContext, useRef } from 'react'
import { useMutation } from 'react-query'

export function OnDutyButton() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const axios = new AxiosHttpClient(undefined)
  const toast = useToast()
  const cancelRef = useRef()
  const { user, handleSetUser } = useContext(UserContext)

  const buttonText =
    user?.onDuty === true ? 'Sair do plantão' : 'Entrar no plantão'

  const toastTitle =
    user?.onDuty === true ? 'Saiu do plantão' : 'Entrou no plantão'

  const toastDescription =
    user?.onDuty === true
      ? 'Agora suas horas não serão registradas!'
      : 'Agora você pode receber clientes e suas horas serão contadas!'

  async function handleSetOnDuty() {
    await submitOnDutyState.mutateAsync(!user.onDuty)
  }

  const submitOnDutyState = useMutation(
    async (onDuty: boolean) => {
      const { body } = await axios.request({
        method: 'patch',
        url: '/api/staff/v2',
        params: { 'on-duty': onDuty },
      })
      return body
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ['clinicData'] })
        queryClient.invalidateQueries({ queryKey: ['VetData'] })
        handleSetUser({ ...data })
        toast({
          title: toastTitle,
          description: toastDescription,
          status: 'success',
          duration: 1500,
          isClosable: true,
        })
      },
      onError: () => {
        toast({
          title: 'Erro no envio da solicitação',
          description: 'Ocorreu um erro no envio do formulário!',
          status: 'error',
          duration: 1500,
          isClosable: true,
        })
      },
    },
  )

  return (
    <>
      <Button
        p={2}
        bg="green.600"
        _hover={{ background: 'green.800' }}
        borderRadius={500}
        fontSize="0.75rem"
        fontWeight={600}
        color="white"
        onClick={onOpen}
        isLoading={user === undefined}
      >
        {buttonText}
      </Button>

      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {buttonText}
            </AlertDialogHeader>

            <AlertDialogBody>
              Tem certeza que deseja {buttonText.toLowerCase()} ?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} bg="white" onClick={onClose}>
                Cancelar
              </Button>
              <Button
                bg="green.600"
                _hover={{ background: 'green.800' }}
                onClick={() => {
                  onClose()
                  handleSetOnDuty()
                }}
                ml={3}
              >
                Confirmar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}
