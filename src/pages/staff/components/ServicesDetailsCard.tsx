import {
  HStack,
  VStack,
  Divider,
  Table,
  Tbody,
  Tr,
  Td,
  Text,
} from '@chakra-ui/react'
import dayjs from 'dayjs'
import { ServiceModel } from 'domain/models/ServiceModel'
import Link from 'next/link'
import { cityFormatter } from 'presentation/utils/cityFormatter'
import { nameFormatter } from 'presentation/utils/nameFormatter'
import { serviceStatusFormatter } from 'presentation/utils/serviceStatusFormatter'
import { serviceTypeFormatter } from 'presentation/utils/serviceTypeFormatter'
import { ReactNode } from 'react'

interface ServiceDetailsBlockProps {
  children: ReactNode
  last?: boolean
}

interface ServicesDetailsCardProps {
  services: ServiceModel[]
}

function ServiceDetailsBlock({ children, last }: ServiceDetailsBlockProps) {
  return (
    <HStack align="start" justify="space-between" w="max-content">
      <VStack align="start">{children}</VStack>

      {!last && <Divider orientation="vertical" py={7} />}
    </HStack>
  )
}

export function ServicesDetailsCard({ services }: ServicesDetailsCardProps) {
  return (
    <Table
      sx={{
        borderCollapse: 'separate',
        borderSpacing: '0 0.5rem',
      }}
      scrollBehavior={'auto'}
    >
      <Tbody>
        {services === undefined ? (
          <Text>Ainda sem serviços registrados</Text>
        ) : (
          services.map((service) => {
            return (
              <Tr
                key={service.id}
                sx={{
                  td: {
                    background: 'white',
                    whiteSpace: 'nowrap',
                    '&:first-of-type': {
                      borderLeftRadius: '12px',
                    },
                    '&:last-of-type': {
                      borderRightRadius: '12px',
                    },
                  },
                }}
              >
                <Td px={2} textAlign="center">
                  <ServiceDetailsBlock>
                    <Text>
                      {dayjs(service.serviceDate).format("DD MMMM[']YY")}
                    </Text>
                    <Text variant="subtitle-12" lineHeight={0.5}>
                      {serviceStatusFormatter(service.status)}
                    </Text>
                  </ServiceDetailsBlock>
                </Td>

                <Td px={2} textAlign="center">
                  <ServiceDetailsBlock>
                    <Text>ID</Text>
                    <Text fontWeight={600}>{service.id}</Text>
                  </ServiceDetailsBlock>
                </Td>

                <Td px={2} textAlign="center">
                  <ServiceDetailsBlock>
                    <Text>Cidade</Text>
                    <Text fontWeight={600}>
                      {cityFormatter(service.city.name)}
                    </Text>
                  </ServiceDetailsBlock>
                </Td>

                <Td px={2} textAlign="center">
                  <ServiceDetailsBlock>
                    <Text>Serviço</Text>
                    <Text fontWeight={600}>
                      {serviceTypeFormatter(service.type)}
                    </Text>
                  </ServiceDetailsBlock>
                </Td>

                <Td px={2} textAlign="center">
                  <ServiceDetailsBlock last>
                    <Text>Médico</Text>
                    <Text fontWeight={600}>
                      {nameFormatter(service.medic.fullName)}
                    </Text>
                  </ServiceDetailsBlock>
                </Td>
              </Tr>
            )
          })
        )}
      </Tbody>
    </Table>
  )
}
