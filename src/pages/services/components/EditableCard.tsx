import {
  Box,
  Button,
  Editable,
  EditablePreview,
  EditableTextarea,
  Heading,
  Icon,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import { queryClient } from 'infra/cache/react-query'
import { AxiosHttpClient } from 'infra/http/axios-http-client/axios-http-client'
import { UserContext } from 'presentation/context/UserContext'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { FiEdit } from 'react-icons/fi'
import { useMutation } from 'react-query'

interface EditableCardProps {
  whoCanEdit: number
  title: string
  value: string
  id: string
}

export function EditableCard({
  title,
  value,
  id,
  whoCanEdit,
}: EditableCardProps) {
  const { user } = useContext(UserContext)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const axios = new AxiosHttpClient(undefined)
  const toast = useToast()

  const submitNewDescription = useMutation(
    async (description: string) => {
      await axios.request({
        method: 'put',
        url: `api/services/v2/${id}/update-description`,
        body: {
          description,
        },
      })
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['service', { id }])
        toast({
          title: 'Descrição alterada',
          description: 'Descrição alterada com sucesso!',
          status: 'success',
          duration: 1500,
          isClosable: true,
        })
      },
      onError: () => {
        toast({
          title: 'Descrição não alterada',
          description: 'Ocorreu um erro no envio do formulário!',
          status: 'error',
          duration: 1500,
          isClosable: true,
        })
      },
    },
  )

  async function handleSubmitNewDescription({
    description,
  }: {
    description: string
  }) {
    await submitNewDescription.mutateAsync(description)
  }

  const userCanEdit = user?.id === whoCanEdit

  return (
    <Box w="100%">
      <Text
        display="flex"
        fontSize="1.25rem"
        fontWeight={600}
        alignContent="center"
      >
        {title}
        {userCanEdit && (
          <Icon
            cursor="pointer"
            pl={2}
            as={FiEdit}
            boxSize="1.5rem"
            onClick={onOpen}
          />
        )}
      </Text>
      <Heading p={4}>
        <Image
          w="128px"
          src="https://i.pinimg.com/originals/b1/69/7d/b1697d7a63314dd55015100c592d078c.png"
        />
      </Heading>
      <Text
        textDecorationLine={'underline'}
        textUnderlineOffset="5px"
        lineHeight={1.8}
        w="100%"
        h="100%"
        minH="20rem"
        p="1rem"
        fontFamily={'monospace'}
      >
        {value}
      </Text>

      {userCanEdit && (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{title}</ModalHeader>
            <ModalCloseButton />

            <form onSubmit={handleSubmit(handleSubmitNewDescription)}>
              <ModalBody>
                <Editable defaultValue={value} startWithEditView={true}>
                  <EditablePreview />
                  <EditableTextarea
                    {...register('description', { minLength: 5 })}
                  />
                </Editable>
              </ModalBody>

              <ModalFooter>
                <Button variant="ghost" onClick={onClose}>
                  Cancelar
                </Button>
                <Button bg="green.600" type="submit">
                  Confirmar
                </Button>
              </ModalFooter>
            </form>
          </ModalContent>
        </Modal>
      )}
    </Box>
  )
}
