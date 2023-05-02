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
import { paymentStatusFormatter } from 'presentation/utils/paymentStatusFormatter'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'

interface UpdatePaymentStatusModalProps {
  service: ServiceModel
}

const ServiceStatus = ['WAITING_PAYMENT', 'PAID', 'CANCELED']

export function UpdatePaymentStatusModal({
  service,
}: UpdatePaymentStatusModalProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm()

  const toast = useToast()
  const axios = new AxiosHttpClient(undefined)

  const updatePaymentStatus = useMutation(
    async (paymentStatus: string) => {
      await axios.request({
        method: 'patch',
        url: `/api/services/v2/${service.id}/update-payment`,
        params: {
          'payment-status': paymentStatus,
        },
      })
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['service', { id: service.id }])
        queryClient.invalidateQueries({ queryKey: ['services'] })
        reset()
        toast({
          title: 'Status atualizado!',
          description: `O status do pagamento foi atualizado!`,
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

  async function handleUpdatePaymentStatus({
    paymentStatus,
  }: {
    paymentStatus: string
  }) {
    await updatePaymentStatus.mutateAsync(paymentStatus)
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
        Atualizar pagamento
      </Text>

      <Modal
        size="md"
        isOpen={isOpen}
        onClose={onClose}
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Atualizar status do pagamento</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit(handleUpdatePaymentStatus)}>
            <ModalBody>
              <Select
                placeholder="Status"
                {...register('paymentStatus', { required: true })}
              >
                {ServiceStatus.map((status, index) => (
                  <option
                    key={index}
                    value={status}
                    disabled={status === service.paymentStatus}
                  >
                    {paymentStatusFormatter(status)}
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
                isLoading={isSubmitting || updatePaymentStatus.isLoading}
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
