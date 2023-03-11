/* eslint-disable react/no-children-prop */
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  VStack,
  Input,
  Select,
  HStack,
  ModalFooter,
  useDisclosure,
  Icon,
  Textarea,
  Text,
  useToast,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react'
import { FiPlus } from 'react-icons/fi'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useMutation } from 'react-query'
import { queryClient } from 'presentation/services/react-query'
import { AxiosHttpClient } from './../../../infra/http/axios-http-client/axios-http-client'

const newReportModalSchema = z.object({
  type: z.string({ required_error: 'Tipo é obrigatório' }),
  price: z
    .string()
    .optional()
    .transform((price) => Number(price) * 1000),
  title: z
    .string()
    .min(15, { message: 'O Título deve conter no mínimo 15 caracteres' })
    .max(70, { message: 'O Título deve conter no máximo 70 caracteres' }),
  description: z
    .string()
    .min(15, { message: 'A descrição deve conter no mínimo 15 caracteres' })
    .max(70, { message: 'A descrição deve conter no máximo 255 caracteres' }),
})

type newReportModalData = z.infer<typeof newReportModalSchema>

export function NewReportModal() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<newReportModalData>({
    resolver: zodResolver(newReportModalSchema),
  })

  const axios = new AxiosHttpClient()

  const createNewReport = useMutation(
    async (report: newReportModalData) => {
      const response = axios.request({
        url: '/api/reports/v1/create',
        method: 'post',
        body: {
          ...report,
        },
      })
      return response
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries()
        reset()
        toast({
          title: 'Relatório criado',
          description: 'O relatório foi adicionado ao sistema!',
          status: 'success',
          duration: 1500,
          isClosable: true,
        })
      },
      onError: () => {
        toast({
          title: 'Relatório não criado',
          description: `Ocorreu um erro no envio do relatório!
                        Verifique os campos e tente novamente.`,
          status: 'error',
          duration: 1500,
          isClosable: true,
        })
      },
    },
  )
  async function handleCreateNewReport(report: newReportModalData) {
    await createNewReport.mutateAsync(report)
  }

  const reportTypeIsPayment = watch('type') === 'PAYMENT'

  return (
    <>
      <Icon
        bg="green.600"
        borderRadius="full"
        p={1}
        alignItems="center"
        display="flex"
        as={FiPlus}
        boxSize={6}
        color="white"
        onClick={onOpen}
        cursor="pointer"
      />

      <Modal
        size="2xl"
        isOpen={isOpen}
        onClose={onClose}
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Novo relatório</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit(handleCreateNewReport)}>
            <ModalBody>
              <VStack>
                <HStack w="100%">
                  <VStack w="100%">
                    <Select
                      placeholder="Tipo"
                      isInvalid={!!errors.type}
                      {...register('type')}
                    >
                      <option value="PAYMENT">Pagamento</option>
                      <option value="REQUEST">Pedido</option>
                      <option value="REPORT">Relatório</option>
                    </Select>
                    {errors.type && (
                      <Text size="sm">{errors.type?.message}</Text>
                    )}
                  </VStack>
                  <VStack w="100%">
                    <InputGroup>
                      <InputLeftElement
                        pointerEvents="none"
                        color="black"
                        fontSize="1rem"
                        children="R$"
                      />
                      <Input
                        placeholder="1200"
                        {...register('price')}
                        required={reportTypeIsPayment}
                        disabled={!reportTypeIsPayment}
                        title={
                          reportTypeIsPayment
                            ? 'Informe o preço do pagamento'
                            : 'Não é possível enviar preço em relatórios diferentes de "Pagamento"'
                        }
                      />
                    </InputGroup>
                  </VStack>
                </HStack>
                <VStack w="100%" align="start">
                  <Input
                    type="text"
                    variant="flushed"
                    placeholder="Titulo"
                    required
                    isInvalid={!!errors.title}
                    {...register('title')}
                  />
                  {errors.title && (
                    <Text fontSize="sm">{errors.title?.message}</Text>
                  )}
                  <Textarea
                    placeholder="Descrição"
                    isInvalid={!!errors.description}
                    {...register('description')}
                  />
                  {errors.description && (
                    <Text fontSize="sm">{errors.description?.message}</Text>
                  )}
                </VStack>
                <Input type="file" variant="unstyled" />
              </VStack>
            </ModalBody>

            <ModalFooter>
              <Button
                variant="ghost"
                mr={3}
                onClick={() => {
                  onClose()
                  reset()
                }}
              >
                Cancelar
              </Button>
              <Button
                bg="green.600"
                _hover={{ background: 'green.800' }}
                color="white"
                type="submit"
                isLoading={isSubmitting || createNewReport.isLoading}
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
