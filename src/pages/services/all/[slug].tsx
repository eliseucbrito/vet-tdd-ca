/* eslint-disable array-callback-return */
import { VStack, Heading, Divider, Text, Spinner, Flex } from '@chakra-ui/react'
import { ServiceModel } from 'domain/models/ServiceModel'
import { GetServerSideProps } from 'next'
import { useServices } from 'presentation/hooks/useServices'
import { serviceTypeFormatter } from 'presentation/utils/serviceTypeFormatter'
import { slugToServiceType } from 'presentation/utils/slugToServiceType'
import { ServicesList } from '../components/ServicesList'

interface ServicePerTypeProps {
  slug: string
  servicesSSR: ServiceModel[]
}

export default function ServicePerType({
  servicesSSR,
  slug,
}: ServicePerTypeProps) {
  const { data: services, isFetching, isError, isSuccess } = useServices()

  const slugFormatted = slug.substring(0, slug.length - 1).toUpperCase()
  console.log(slugFormatted)
  const folderName = serviceTypeFormatter(slugFormatted) + 's'

  const servicesSeparated = services?.filter(
    (service) => service.type.toString() === slugToServiceType(slug),
  )

  const IsEmpty = services !== undefined && !(services.length > 0)

  return (
    <VStack
      h="100vh"
      w="100%"
      align="start"
      p={['0 1rem', '1rem 1.5rem 1rem 3rem']}
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
      {!isSuccess || IsEmpty ? (
        // <ErrorOrLoadingMessage
        //   isError={isError}
        //   isEmpty={IsEmpty}
        //   isLoading={isFetching}
        //   emptyMessage={`Ainda não existem ${folderName}`}
        // />
        <Spinner />
      ) : (
        <ServicesList services={servicesSeparated} />
      )}
    </VStack>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const slug = String(ctx.params!.slug)
  // const api = setupAPIClient(ctx)
  // const { data } = await api.get('/api/services/v1', {
  //   params: {
  //     sort_by: 'createdAt',
  //     direction: 'DESC',
  //   },
  // })

  // const servicesSSR = data.map((service: Service) => {
  //   return {
  //     ...service,
  //   }
  // })

  return {
    props: {
      slug,
      // servicesSSR,
    },
  }
}