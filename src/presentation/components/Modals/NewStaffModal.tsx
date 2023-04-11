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
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useMutation } from 'react-query'
import { queryClient } from 'infra/cache/react-query'
import { AxiosHttpClient } from '../../../infra/http/axios-http-client/axios-http-client'
import Link from 'next/link'
import { StaffModel } from 'domain/models/StaffModel'
import { useRoles } from 'presentation/hooks/useRoles'
import { roleFormatter } from 'presentation/utils/roleFormatter'

const newStaffModalSchema = z.object({
  role: z.string().min(1, { message: 'O cargo é obrigatório' }),
  fullName: z.string().min(7, { message: 'O nome completo é obrigatório' }),
  email: z.string().email({ message: 'Endereço de email inválido' }),
  password: z
    .string()
    .min(8, { message: 'O tamanho mínimo da senha é de 8 caracteres' }),
  confirmPassword: z
    .string()
    .min(8, { message: 'O tamanho mínimo da senha é de 8 caracteres' }),
  cpf: z
    .string()
    .length(11, { message: 'Um CPF precisa conter 11 caracteres' }),
  avatarUrl: z
    .string()
    .refine((avatarUrl) => avatarUrl.includes('https://'), {
      message: 'O Endereço para o avatar é inválido',
    })
    .optional(),
  baseSalary: z
    .string()
    .min(1, { message: 'O salário base é obrigatório' })
    .transform((salary) => Number(salary) * 1000),
  weeklyWorkLoad: z
    .string()
    .min(1, { message: 'A carga horária semanal é obrigatória' })
    .transform((workLoadInHours) => Number(workLoadInHours) * 60),
})

type newStaffModalData = z.infer<typeof newStaffModalSchema>

export function NewStaffModal() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<newStaffModalData>({
    resolver: zodResolver(newStaffModalSchema),
  })

  const { data: roles } = useRoles()
  const axios = new AxiosHttpClient(undefined)

  console.log('NEW STAFF ERRORS ', errors)

  const createNewStaff = useMutation(
    async (staff: newStaffModalData) => {
      return axios.request({
        url: '/api/staff/v2/create',
        method: 'post',
        body: {
          ...staff,
        },
      })
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(['staff', { id: data.body }])
        queryClient.invalidateQueries(['staff'])
        reset()
        toast({
          title: 'Staff criado',
          description: (
            <Link href={`/staff/${data.body}`}>
              'Staff adicionado ao sistema, Clique aqui para ir aos detalhes!'
            </Link>
          ),
          status: 'success',
          duration: 2500,
          isClosable: true,
        })
      },
      onError: () => {
        toast({
          title: 'Staff não criado',
          description: `Ocorreu um erro no envio do staff!
                        Verifique os campos e tente novamente.`,
          status: 'error',
          duration: 1500,
          isClosable: true,
        })
      },
    },
  )
  async function handleCreateNewStaff(staff: newStaffModalData) {
    await createNewStaff.mutateAsync(staff)
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
        Adicionar staff
      </ChakraButton>

      <Modal
        size="2xl"
        isOpen={isOpen}
        onClose={onClose}
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Adicionar novo staff</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit(handleCreateNewStaff)}>
            <ModalBody>
              <VStack align="center" justify="center">
                <Avatar src={watch('avatarUrl')} />
                <Input
                  placeholder="Nome Completo"
                  isInvalid={!!errors.fullName}
                  {...register('fullName')}
                />
                <HStack w="100%">
                  <Select
                    isInvalid={!!errors.role}
                    placeholder="Cargo"
                    {...register('role')}
                  >
                    {roles?.map((role) => (
                      <option key={role.id} value={role.description}>
                        {roleFormatter(role.description)}
                      </option>
                    ))}
                  </Select>

                  <Input
                    isInvalid={!!errors.cpf}
                    placeholder="000.000.000-00"
                    {...register('cpf')}
                  />
                </HStack>

                <Input
                  type="email"
                  placeholder="example@gmail.com"
                  {...register('email')}
                />

                <HStack>
                  <Input
                    placeholder="Avatar URL"
                    isInvalid={!!errors.avatarUrl}
                    {...register('avatarUrl')}
                  />

                  <Input
                    placeholder="Salário base"
                    isInvalid={!!errors.baseSalary}
                    type="number"
                    {...register('baseSalary')}
                  />

                  <Input
                    placeholder="Carga horária semanal"
                    isInvalid={!!errors.weeklyWorkLoad}
                    type="number"
                    {...register('weeklyWorkLoad')}
                  />
                </HStack>

                <HStack>
                  <Input
                    placeholder="Senha"
                    isInvalid={!!errors.password}
                    type="password"
                    {...register('password')}
                  />

                  <Input
                    placeholder="Confirmar senha"
                    isInvalid={!!errors.confirmPassword}
                    type="password"
                    {...register('confirmPassword')}
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
                isLoading={isSubmitting || createNewStaff.isLoading}
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
