import {
  HStack,
  VStack,
  Divider,
  Table,
  Tbody,
  Tr,
  Td,
  Text,
  Thead,
  Th,
} from '@chakra-ui/react'
import dayjs from 'dayjs'
import { ServiceModel } from 'domain/models/ServiceModel'
import Link from 'next/link'
import { CheckBar } from 'presentation/components/Cards/CheckBar'
import { ErrorOrEmptyMessage } from 'presentation/components/ErrorOrEmptyMessage'
import { cityFormatter } from 'presentation/utils/cityFormatter'
import { nameFormatter } from 'presentation/utils/nameFormatter'
import { serviceStatusFormatter } from 'presentation/utils/serviceStatusFormatter'
import { serviceTypeFormatter } from 'presentation/utils/serviceTypeFormatter'
import { ReactNode } from 'react'
require('dayjs/locale/pt-br')

interface ServiceDetailsBlockProps {
  children: ReactNode
  last?: boolean
}

interface ServicesDetailsCardProps {
  services: ServiceModel[]
  patientVersion?: boolean
}

function ServiceDetailsBlock({ children, last }: ServiceDetailsBlockProps) {
  return (
    <VStack
      align="center"
      h="100%"
      borderRight={last ? 'none' : '1px solid #A0A1A3'}
    >
      {children}
    </VStack>
  )
}

export function ServicesDetailsCard({
  services,
  patientVersion,
}: ServicesDetailsCardProps) {
  return (
    <HStack w="100%" gap={10}>
      {services?.length >= 1 ? (
        <>
          <VStack h="100%" spacing={0}>
            {services.map((service) => (
              <CheckBar
                key={service.id}
                completed={service.status === 'COMPLETED'}
              />
            ))}
          </VStack>

          <Table
            sx={{
              borderCollapse: 'separate',
              borderSpacing: '0 0.5rem',
            }}
            scrollBehavior={'auto'}
          >
            <Thead display="none" sx={{ th: { textAlign: 'center' } }}>
              <Th>Data</Th>
              <Th>ID</Th>
              <Th>Cidade</Th>
              <Th>Tipo</Th>
              {patientVersion ? <Th>Médico</Th> : <Th>Paciente</Th>}
            </Thead>
            <Tbody>
              {services.map((service) => (
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
                  <Td px={2}>
                    <ServiceDetailsBlock>
                      <Text>
                        {dayjs(service.serviceDate)
                          .locale('pt-br')
                          .format("DD MMMM[']YY")}
                      </Text>
                      <Text variant="subtitle-12" lineHeight={0.5}>
                        {serviceStatusFormatter(service.status)}
                      </Text>
                    </ServiceDetailsBlock>
                  </Td>

                  <Td px={2}>
                    <ServiceDetailsBlock>
                      <Text>ID</Text>
                      <Text fontWeight={600}>{service.id}</Text>
                    </ServiceDetailsBlock>
                  </Td>

                  <Td px={2}>
                    <ServiceDetailsBlock>
                      <Text>Cidade</Text>
                      <Text fontWeight={600}>
                        {cityFormatter(service.city.name)}
                      </Text>
                    </ServiceDetailsBlock>
                  </Td>

                  <Td px={2}>
                    <ServiceDetailsBlock>
                      <Text>Serviço</Text>
                      <Text fontWeight={600}>
                        {serviceTypeFormatter(service.type)}
                      </Text>
                    </ServiceDetailsBlock>
                  </Td>

                  <Td px={2}>
                    <ServiceDetailsBlock last>
                      <Text>{patientVersion ? 'Médico' : 'Paciente'}</Text>
                      <Text fontWeight={600}>
                        {patientVersion
                          ? nameFormatter(service.medic.fullName)
                          : service.patient.name}
                      </Text>
                    </ServiceDetailsBlock>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </>
      ) : (
        <ErrorOrEmptyMessage
          isEmpty={services?.length === 0}
          isError={services === undefined}
        />
      )}
    </HStack>
  )
}
