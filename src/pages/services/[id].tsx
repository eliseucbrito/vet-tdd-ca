import { Heading, HStack, Text, VStack, Box } from '@chakra-ui/react'
import { ServiceModel } from 'domain/models/ServiceModel'
import { GetServerSideProps } from 'next'
import { ErrorOrEmptyMessage } from 'presentation/components/ErrorOrEmptyMessage'
import { UserContext } from 'presentation/context/UserContext'
import { useServiceDetails } from 'presentation/hooks/useServices'
import { useContext } from 'react'
import { UpdatePaymentStatusModal } from './components/UpdatePaymentStatusModal'
import { UpdateServiceStatusModal } from './components/UpdateServiceStatusModal'

interface ServiceDetailsProps {
  id: string
  initialData: ServiceModel
}

export default function ServiceDetails({
  id,
  initialData,
}: ServiceDetailsProps) {
  const { user } = useContext(UserContext)

  const {
    data: service,
    isError,
    isFetching,
    isSuccess,
  } = useServiceDetails(id)

  const title = service?.type.toString() === 'EXAM' ? 'Exame de' : 'Razão'
  const userCanEdit = user?.id === service?.medic.id

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
        <ErrorOrEmptyMessage isError={isError} isLoading={isFetching} />
      ) : (
        <>
          <HStack w="100%" align="center" justify="space-between" pb={4}>
            <Heading fontWeight={600} fontSize="1.5rem" color="green.900">
              Atendimento N° {id}
            </Heading>
            <HStack>
              {userCanEdit && <UpdateServiceStatusModal service={service} />}
              <UpdatePaymentStatusModal service={service} />
            </HStack>
          </HStack>

          {/* <ServiceInformations service={service} /> */}

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
              <Text>{service.reason}</Text>
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
              {/* <EditableCard
                staffId={service.medic.id}
                id={service.id}
                title="Resultado do Exame"
                value={service.description}
              /> */}
            </Box>
          </VStack>
        </>
      )}
    </VStack>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const id = String(ctx.params!.id)
  // const api = setupAPIClient(ctx)
  // const response = await api.get(`/api/services/v1/${id}`)

  // const initialData: Service = {
  //   ...response.data,
  // }

  return {
    props: {
      id,
      // initialData,
    },
  }
}
