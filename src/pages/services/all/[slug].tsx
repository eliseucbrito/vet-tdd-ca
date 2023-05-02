/* eslint-disable array-callback-return */
import {
  VStack,
  Heading,
  Divider,
  Text,
  Spinner,
  Flex,
  Input,
} from '@chakra-ui/react'
import { ServiceModel } from 'domain/models/ServiceModel'
import { AxiosHttpClient } from 'infra/http/axios-http-client/axios-http-client'
import { GetServerSideProps } from 'next'
import { Container } from 'presentation/components/Defaults/Container'
import { ErrorOrEmptyMessage } from 'presentation/components/ErrorOrEmptyMessage'
import { ServicesList } from 'presentation/components/Services/ServicesList'
import { useServices } from 'presentation/hooks/useServices'
import { serviceTypeFormatter } from 'presentation/utils/serviceTypeFormatter'
import { slugToServiceType } from 'presentation/utils/slugToServiceType'
import { useState } from 'react'

interface ServicePerTypeProps {
  slug: string
  servicesInitialState: ServiceModel[]
}

export default function ServicePerType({
  servicesInitialState,
  slug,
}: ServicePerTypeProps) {
  const {
    data: services,
    isLoading,
    isFetching,
    isError,
    isSuccess,
  } = useServices()

  const servicesSeparated =
    services !== undefined
      ? services
          .filter(
            (service) => service.type.toString() === slugToServiceType(slug),
          )
          .reverse()
      : servicesInitialState
          .filter(
            (service) => service.type.toString() === slugToServiceType(slug),
          )
          .reverse()

  const [searchingFor, setSearchingFor] = useState('')
  const [servicesFounded, setServicesFounded] =
    useState<ServiceModel[]>(servicesSeparated)

  const slugFormatted = slug.substring(0, slug.length - 1).toUpperCase()

  const folderName = serviceTypeFormatter(slugFormatted) + 's'

  const IsEmpty = services !== undefined && !(services.length > 0)

  function searchServicePerPatient(name: string) {
    const founded = servicesSeparated?.filter((service) =>
      service.patient.name.toLowerCase().includes(name.toLowerCase()),
    )

    if (founded === undefined) {
      setServicesFounded([])
    } else {
      setServicesFounded(founded)
    }

    if (name === '') {
      setServicesFounded(servicesSeparated)
    }
  }

  return (
    <Container
      flexDir="column"
      overflow="auto"
      sx={{
        '&::-webkit-scrollbar': {
          display: 'none',
        },
      }}
    >
      <Heading
        fontWeight={600}
        fontSize="1.5rem"
        color="green.900"
        lineHeight={1}
        p="0.75rem"
      >
        {folderName}
      </Heading>
      <Input
        borderRadius={100}
        w="min-content"
        bg="white"
        placeholder="Pesquisar"
        marginBottom={2}
        value={searchingFor}
        onChange={(e) => {
          searchServicePerPatient(e.target.value)
          setSearchingFor(e.target.value)
        }}
      />
      {!isSuccess || IsEmpty ? (
        <ErrorOrEmptyMessage
          isError={isError}
          isEmpty={IsEmpty}
          isLoading={isLoading}
        />
      ) : (
        <ServicesList services={servicesFounded} />
      )}
    </Container>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const slug = String(ctx.params!.slug)
  const axios = new AxiosHttpClient(ctx)
  const { body: services } = await axios.request<ServiceModel[]>({
    method: 'get',
    url: 'api/services/v2',
  })

  return {
    props: {
      slug,
      servicesInitialState: services,
    },
  }
}
