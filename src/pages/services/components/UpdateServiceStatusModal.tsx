/* eslint-disable react/no-children-prop */
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import { AxiosError } from 'axios'
import { ServiceModel } from 'domain/models/ServiceModel'
import { queryClient } from 'infra/cache/react-query'
import { AxiosHttpClient } from 'infra/http/axios-http-client/axios-http-client'
import { serviceStatusFormatter } from 'presentation/utils/serviceStatusFormatter'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'

interface UpdateServiceStatusModalProps {
  service: ServiceModel
}

const ServiceStatus = [
  'SCHEDULED',
  'NOT_INITIALIZED',
  'IN_PROGRESS',
  'COMPLETED',
  'CANCELED',
]

export function UpdateServiceStatusModal({
  service,
}: UpdateServiceStatusModalProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm()

  const toast = useToast()
  const axios = new AxiosHttpClient(undefined)

  const updateServiceStatus = useMutation(
    async (status: string) => {
      await axios.request({
        method: 'patch',
        url: `/api/services/v2/${service.id}/update-status`,
        params: {
          status,
        },
      })
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['service', service.id] })
        queryClient.invalidateQueries({ queryKey: ['services'] })
        reset()
        toast({
          title: 'Status atualizado!',
          description: `O status foi atualizado!`,
          status: 'success',
          duration: 1500,
          isClosable: true,
        })
      },
      onError: (error: AxiosError<{ message: string }>) => {
        toast({
          title: 'Status não atualizado',
          description: `Ocorreu um erro no envio do formulário ERROR: ${error.response.data.message}!`,
          status: 'error',
          duration: 2000,
          isClosable: true,
        })
      },
    },
  )

  async function handleUpdateStaffRole({ status }: { status: string }) {
    await updateServiceStatus.mutateAsync(status)
  }

  return (
    <>
      <Text
        p={2}
        as={'button'}
        bg="green.600"
        _hover={{ background: 'green.800' }}
        borderRadius={500}
        fontSize="0.75rem"
        fontWeight={600}
        color="white"
        onClick={onOpen}
      >
        Atualizar status
      </Text>

      <Modal
        size="md"
        isOpen={isOpen}
        onClose={onClose}
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Atualizar status do atendimento</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit(handleUpdateStaffRole)}>
            <ModalBody>
              <Select
                placeholder="Status"
                {...register('status', { required: true })}
              >
                {ServiceStatus.map((status, index) => (
                  <option key={index} value={status}>
                    {serviceStatusFormatter(status)}
                  </option>
                ))}
              </Select>
            </ModalBody>

            <ModalFooter>
              <Button variant="ghost" mr={3} onClick={onClose}>
                Cancelar
              </Button>
              <Button
                bg="green.600"
                _hover={{ background: 'green.800' }}
                color="white"
                type="submit"
                isLoading={isSubmitting || updateServiceStatus.isLoading}
              >
                Concluir
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  )
}
