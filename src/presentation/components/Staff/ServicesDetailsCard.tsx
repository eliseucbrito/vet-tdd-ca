import {
  HStack,
  VStack,
  Table,
  Tbody,
  Tr,
  Td,
  Text,
  Thead,
  Th,
  Box,
} from '@chakra-ui/react'
import dayjs from 'dayjs'
import { ServiceModel, ServiceStatus } from 'domain/models/ServiceModel'
import Router from 'next/router'
import { CardDetailBlock } from 'presentation/components/Cards/CardDetailBlock'
import { CheckBar } from 'presentation/components/Cards/CheckBar'
import { ErrorOrEmptyMessage } from 'presentation/components/ErrorOrEmptyMessage'
import { cityFormatter } from 'presentation/utils/cityFormatter'
import { nameFormatter } from 'presentation/utils/nameFormatter'
import { serviceStatusFormatter } from 'presentation/utils/serviceStatusFormatter'
import { serviceTypeFormatter } from 'presentation/utils/serviceTypeFormatter'
require('dayjs/locale/pt-br')

interface ServicesDetailsCardProps {
  services: ServiceModel[]
  patientVersion?: boolean
}

export function ServicesDetailsCard({
  services,
  patientVersion,
}: ServicesDetailsCardProps) {
  function handleRedirectToServiceDetails(id: number) {
    Router.push(`/services/${id}`)
  }

  return (
    <HStack w="100%" h="100%" gap={10}>
      {services?.length >= 1 ? (
        <>
          <VStack h="100%" spacing={0}>
            {services.map((service) => (
              <CheckBar
                key={service.id}
                completed={service.status === ServiceStatus.COMPLETED}
              />
            ))}
          </VStack>

          <Box w="100%" overflowX="auto">
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
                        paddingInline: 0,
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
                    cursor="pointer"
                    onClick={() => handleRedirectToServiceDetails(service.id)}
                  >
                    <Td>
                      <CardDetailBlock>
                        <Text>
                          {dayjs(service.serviceDate)
                            .locale('pt-br')
                            .format("DD MMMM[']YY")}
                        </Text>
                        <Text variant="subtitle-12" lineHeight={0.5}>
                          {serviceStatusFormatter(service.status)}
                        </Text>
                      </CardDetailBlock>
                    </Td>

                    <Td>
                      <CardDetailBlock>
                        <Text>ID</Text>
                        <Text fontWeight={600}>{service.id}</Text>
                      </CardDetailBlock>
                    </Td>

                    <Td>
                      <CardDetailBlock>
                        <Text>Cidade</Text>
                        <Text fontWeight={600}>
                          {cityFormatter(service.city.name)}
                        </Text>
                      </CardDetailBlock>
                    </Td>

                    <Td>
                      <CardDetailBlock>
                        <Text>Serviço</Text>
                        <Text fontWeight={600}>
                          {serviceTypeFormatter(service.type)}
                        </Text>
                      </CardDetailBlock>
                    </Td>

                    <Td>
                      <CardDetailBlock last>
                        <Text>{patientVersion ? 'Médico' : 'Paciente'}</Text>
                        <Text fontWeight={600}>
                          {patientVersion
                            ? nameFormatter(service.medic.fullName)
                            : service.patient.name}
                        </Text>
                      </CardDetailBlock>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
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
