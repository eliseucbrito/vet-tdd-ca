import {
  Flex,
  Heading,
  HStack,
  Text,
  VStack,
  Image,
  Avatar,
  Divider,
  Spinner,
  Editable,
  EditablePreview,
  EditableTextarea,
  Textarea,
  Icon,
  Box,
} from '@chakra-ui/react'
import { GetServerSideProps } from 'next'
import {
  getServices,
  useServiceDetails,
  useServices,
} from '../../hooks/useServices'
import { EditableCard } from '../../components/ServiceDetails/EditableCard'
import * as img from '../../assets/assets'
import { ServiceInformations } from '../../components/ServiceDetails/ServiceInformations'
import { setupAPIClient } from '../../services/api'
import { Service } from '../../utils/@types/service'
import { ErrorOrLoadingMessage } from '../../components/ErrorOrLoadingMessage'
import { UpdateServiceStatusModal } from '../../components/Modals/UpdateServiceStatusModal'
import { useContext } from 'react'
import { VetContext } from '../../context/VetContext'

interface ServiceDetailsProps {
  id: string
  initialData: Service
}

export default function ServiceDetails({
  id,
  initialData,
}: ServiceDetailsProps) {
  const { user } = useContext(VetContext)
  const title = initialData.type.toString() === 'EXAM' ? 'Exame de' : 'Razão'

  const {
    data: service,
    isError,
    isFetching,
    isSuccess,
  } = useServiceDetails(id, {
    initialData,
  })

  const userCanEdit = user?.id === service?.staff.id

  return (
    <VStack
      align="start"
      w="100%"
      h="100vh"
      p={['0 1rem', '1rem 1.5rem 1rem 3rem']}
      overflow="auto"
      sx={{
        '&::-webkit-scrollbar': {
          display: 'none',
        },
      }}
    >
      {!isSuccess ? (
        <ErrorOrLoadingMessage
          isError={isError}
          isLoading={isFetching}
          errorMessage="Serviço não encontrado"
        />
      ) : (
        <>
          <HStack w="100%" align="center" justify="space-between" pb={4}>
            <Heading fontWeight={600} fontSize="1.5rem" color="green.900">
              Atendimento N° {id}
            </Heading>
            {userCanEdit && <UpdateServiceStatusModal service={service} />}
          </HStack>

          <ServiceInformations service={service} />

          <VStack w="100%">
            <Text
              textAlign="center"
              w="100%"
              fontSize="1.25rem"
              fontWeight={600}
              bg="blue.300"
            >
              Detalhes
            </Text>
            <VStack w="100%" align="start" borderBottom="1px">
              <Text fontSize="1.125rem" fontWeight={600}>
                {title}
              </Text>
              <Text>{service.title}</Text>
            </VStack>

            <VStack w="100%" align="start" borderBottom="1px">
              <Text fontSize="1.125rem" fontWeight={600}>
                Descrição
              </Text>
              <Text>{service.description}</Text>
            </VStack>

            <Box
              p="1rem"
              bg="white"
              borderRadius={12}
              w="100%"
              h="100%"
              minH="20rem"
            >
              <EditableCard
                staffId={service.staff.id}
                id={service.id}
                title="Resultado do Exame"
                value={service.description}
              />
            </Box>
          </VStack>
        </>
      )}
    </VStack>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const id = String(ctx.params!.id)
  const api = setupAPIClient(ctx)
  const response = await api.get(`/api/services/v1/${id}`)

  const initialData: Service = {
    ...response.data,
  }

  return {
    props: {
      id,
      initialData,
    },
  }
}
