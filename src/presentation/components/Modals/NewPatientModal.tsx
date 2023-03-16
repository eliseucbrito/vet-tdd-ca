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
} from '@chakra-ui/react'
import { FiPlus } from 'react-icons/fi'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useMutation } from 'react-query'
import { queryClient } from 'infra/cache/react-query'
import { AxiosHttpClient } from './../../../infra/http/axios-http-client/axios-http-client'
import Link from 'next/link'
import { PatientModel } from 'domain/models/PatientModel'

const newPatientModalSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'O nome deve conter no mínimo 3 caracteres' }),
  kind: z.string().min(1, { message: 'O tipo do paciente é obrigatório' }),
  breed: z.string().min(3),
  owner: z
    .string()
    .min(3, { message: 'O nome deve conter no mínimo 3 caracteres' }),
  ownerContact: z
    .string()
    .min(3, { message: 'O número deve conter 11 caracteres' }),
  birthDate: z
    .string()
    .min(1, { message: 'A data de nascimento é obrigatório' })
    .transform((date) => date.replaceAll('-', '/')),
  sex: z.enum(['MALE', 'FEMALE']),
})

type newPatientModalData = z.infer<typeof newPatientModalSchema>

export function NewPatientModal() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<newPatientModalData>({
    resolver: zodResolver(newPatientModalSchema),
  })

  const axios = new AxiosHttpClient()

  const createNewPatient = useMutation(
    async (patient: newPatientModalData) => {
      return axios.request<PatientModel>({
        url: '/api/patients/v1/create',
        method: 'post',
        body: {
          ...patient,
          avatarUrl: '',
        },
      })
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ['patients'] })
        reset()
        toast({
          title: 'Paciente criado',
          description: (
            <Link href={`/patients/${data.body.id}`}>
              'Paciente adicionado ao sistema, Clique aqui para ir aos
              detalhes!'
            </Link>
          ),
          status: 'success',
          duration: 2500,
          isClosable: true,
        })
      },
      onError: () => {
        toast({
          title: 'Paciente não criado',
          description: `Ocorreu um erro no envio do paciente!
                        Verifique os campos e tente novamente.`,
          status: 'error',
          duration: 1500,
          isClosable: true,
        })
      },
    },
  )
  async function handleCreateNewPatient(patient: newPatientModalData) {
    await createNewPatient.mutateAsync(patient)
  }

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
        Adicionar paciente
      </ChakraButton>

      <Modal
        size="2xl"
        isOpen={isOpen}
        onClose={onClose}
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Adicionar novo paciente</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit(handleCreateNewPatient)}>
            <ModalBody>
              <VStack align="center" justify="center">
                <Avatar />
                <Input
                  placeholder="Nome do paciente"
                  isInvalid={!!errors.name}
                  {...register('name')}
                />
                <HStack w="100%">
                  <Select
                    placeholder="Tipo do paciente"
                    isInvalid={!!errors.kind}
                    {...register('kind')}
                  >
                    <option value="CAT">Gato</option>
                    <option value="DOG">Cachorro</option>
                    <option value="PARROT">Papagaio</option>
                  </Select>
                  <Input
                    isInvalid={!!errors.breed}
                    placeholder="Raça"
                    type="text"
                    {...register('breed')}
                  />
                </HStack>
                <Input
                  isInvalid={!!errors.owner}
                  placeholder="Nome do responsável"
                  {...register('owner')}
                />
                <HStack>
                  <Input
                    placeholder="Contato ex:87999999999"
                    isInvalid={!!errors.ownerContact}
                    type="tel"
                    pattern="[0-9]{11}"
                    {...register('ownerContact')}
                  />
                  <Input
                    placeholder="Data de nascimento"
                    isInvalid={!!errors.birthDate}
                    type="date"
                    {...register('birthDate')}
                  />
                </HStack>
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
                isLoading={isSubmitting || createNewPatient.isLoading}
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
