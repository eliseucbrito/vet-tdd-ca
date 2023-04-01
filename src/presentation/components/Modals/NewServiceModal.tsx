/* eslint-disable react/no-children-prop */
import {
  Button as ChakraButton,
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
  useToast,
  Avatar,
  Textarea,
  Grid,
  GridItem,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useMutation } from 'react-query'
import { queryClient } from 'infra/cache/react-query'
import { AxiosHttpClient } from './../../../infra/http/axios-http-client/axios-http-client'
import Link from 'next/link'
import { ServiceModel } from 'domain/models/ServiceModel'
import dayjs from 'dayjs'
import { useCities } from 'presentation/hooks/useCities'
import { cityFormatter } from './../../utils/cityFormatter'

const newServiceModalSchema = z.object({
  patientId: z
    .string()
    .min(1, { message: 'O ID do paciente é obrigatório' })
    .transform((patientId) => Number(patientId)),
  medicId: z
    .string()
    .min(1, { message: 'O ID do médico é obrigatório' })
    .transform((staffId) => Number(staffId)),
  type: z.enum(['EXAM', 'MEDICAL_CARE', 'SURGERY', 'EMERGENCY']),
  status: z.enum([
    'SCHEDULED',
    'NOT_INITIALIZED',
    'IN_PROGRESS',
    'COMPLETED',
    'CANCELED',
  ]),
  paymentStatus: z.enum(['WAITING_PAYMENT', 'PAID', 'CANCELED']),
  serviceDate: z
    .string()
    .optional()
    .transform((date) => dayjs(date).format('YYYY/MM/DD HH:mm:ss')),
  reason: z
    .string()
    .min(5, { message: 'O Motivo deve conter no mínimo 5 caracteres' }),
  description: z
    .string()
    .min(20, { message: 'A descrição deve conter no mínimo 20 caracteres' }),
  price: z
    .string()
    .min(1, { message: 'O valor do atendimento é obrigatório' })
    .transform((price) => Number(price) * 1000),
  cityNameAndUF: z
    .string()
    .min(2, { message: 'A cidade de atendimento é obrigatória' }),
})

type newServiceModalData = z.infer<typeof newServiceModalSchema>

export function NewServiceModal() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<newServiceModalData>({
    resolver: zodResolver(newServiceModalSchema),
  })

  console.log('NEW SERVICE ERRORS ', errors)

  const { data: cities } = useCities()

  console.log(cities)

  const axios = new AxiosHttpClient()

  const createNewService = useMutation(
    async (service: newServiceModalData) => {
      return axios.request<ServiceModel>({
        url: '/api/services/v2/create',
        method: 'post',
        body: {
          ...service,
        },
      })
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ['services'] })
        queryClient.invalidateQueries({ queryKey: ['VetData'] })
        queryClient.invalidateQueries({ queryKey: ['weeklyEarnings'] })
        reset()
        toast({
          title: 'Serviço criado',
          description: (
            <Link href={`/services/${data.body.id}`}>
              'Serviço adicionado ao sistema, Clique aqui para ir aos detalhes!'
            </Link>
          ),
          status: 'success',
          duration: 2500,
          isClosable: true,
        })
      },
      onError: () => {
        toast({
          title: 'Serviço não criado',
          description: `Ocorreu um erro no envio do serviço!
                        Verifique os campos e tente novamente.`,
          status: 'error',
          duration: 1500,
          isClosable: true,
        })
      },
    },
  )
  async function handleCreateNewService(service: newServiceModalData) {
    await createNewService.mutateAsync(service)
  }

  const statusIsScheduled = watch('status') === 'SCHEDULED'

  return (
    <>
      <ChakraButton
        p={2}
        bg="green.600"
        _hover={{ background: 'green.800' }}
        borderRadius={500}
        fontSize="0.75rem"
        fontWeight={600}
        color="white"
        onClick={onOpen}
      >
        Novo atendimento
      </ChakraButton>

      <Modal
        size="xl"
        isOpen={isOpen}
        onClose={onClose}
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Registrar novo atendimento</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit(handleCreateNewService)}>
            <ModalBody>
              <VStack align="center" justify="center">
                <Avatar />
                <Grid w="100%" gridTemplateColumns={'35% 1fr'} columnGap={6}>
                  <GridItem w="100%">
                    <Input
                      w="100%"
                      placeholder="ID do paciente"
                      isInvalid={!!errors.patientId}
                      marginBottom={2}
                      {...register('patientId')}
                    />
                    <Input
                      w="100%"
                      placeholder="ID do veterinário"
                      isInvalid={!!errors.medicId}
                      marginBottom={2}
                      {...register('medicId')}
                    />
                    <InputGroup>
                      <InputLeftElement
                        pointerEvents="none"
                        color="black"
                        fontSize="1rem"
                        children="R$"
                      />
                      <Input
                        placeholder="Valor"
                        isInvalid={!!errors.price}
                        type="number"
                        {...register('price')}
                      />
                    </InputGroup>
                  </GridItem>
                  <GridItem>
                    <Select
                      placeholder="Tipo de atendimento"
                      isInvalid={!!errors.type}
                      marginBottom={2}
                      {...register('type')}
                    >
                      <option value="EXAM">Exame</option>
                      <option value="MEDICAL_CARE">Atendimento médico</option>
                      <option value="SURGERY">Cirurgia</option>
                      <option value="EMERGENCY">Emergência</option>
                    </Select>
                    <Select
                      placeholder="Status"
                      isInvalid={!!errors.status}
                      marginBottom={2}
                      {...register('status')}
                    >
                      <option value="SCHEDULED">Agendado</option>
                      <option value="NOT_INITIALIZED">Não iniciado</option>
                      <option value="IN_PROGRESS">Em progresso</option>
                      <option value="COMPLETED">Concluído</option>
                      <option value="CANCELED">Cancelado</option>
                    </Select>
                    <Select
                      placeholder="Status do Pagamento"
                      isInvalid={!!errors.status}
                      marginBottom={2}
                      {...register('paymentStatus')}
                    >
                      <option value="WAITING_PAYMENT">
                        Aguardando pagamento
                      </option>
                      <option value="PAID">Pago</option>
                      <option value="CANCELED">Cancelado</option>
                    </Select>
                    {statusIsScheduled && (
                      <Input
                        type="datetime-local"
                        required={statusIsScheduled}
                        {...register('serviceDate')}
                      />
                    )}
                  </GridItem>
                </Grid>

                <HStack w="100%" justify="center">
                  <Input
                    w="100%"
                    placeholder="Motivo do Atendimento"
                    isInvalid={!!errors.reason}
                    {...register('reason')}
                  />
                  <Select
                    placeholder="Cidade de atendimento"
                    isInvalid={!!errors.cityNameAndUF}
                    {...register('cityNameAndUF')}
                  >
                    {cities !== undefined &&
                      cities.map((city) => {
                        return (
                          <option key={city.id} value={city.name}>
                            {cityFormatter(city.name)}
                          </option>
                        )
                      })}
                  </Select>
                </HStack>
                <Textarea
                  placeholder="Descrição"
                  isInvalid={!!errors.description}
                  {...register('description')}
                />
              </VStack>
            </ModalBody>

            <ModalFooter>
              <ChakraButton
                variant="ghost"
                mr={3}
                onClick={() => {
                  onClose()
                  reset()
                }}
              >
                Cancelar
              </ChakraButton>
              <ChakraButton
                bg="green.600"
                _hover={{ background: 'green.800' }}
                color="white"
                type="submit"
                isLoading={isSubmitting}
              >
                Concluir
              </ChakraButton>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  )
}
