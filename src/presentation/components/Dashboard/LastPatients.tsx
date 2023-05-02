import { Box, Table, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react'
import Link from 'next/link'
import { ServiceModel } from 'domain/models/ServiceModel'
import {
  serviceStatusColor,
  serviceStatusFormatter,
} from 'presentation/utils/serviceStatusFormatter'
import { cityFormatter } from 'presentation/utils/cityFormatter'
import {
  paymentStatusColor,
  paymentStatusFormatter,
} from './../../../presentation/utils/paymentStatusFormatter'
import { nameFormatter } from 'presentation/utils/nameFormatter'
import { ErrorOrEmptyMessage } from 'presentation/components/ErrorOrEmptyMessage'
import { StatusTag } from 'presentation/components/Stats/StatusTag'
import { useContext } from 'react'
import { SearchContext } from 'presentation/context/SearchContext'
import Router from 'next/router'

interface LastPatientsProps {
  services: ServiceModel[]
}

export function LastPatients({ services }: LastPatientsProps) {
  const { servicesFounded } = useContext(SearchContext)
  const lastTenPatients = services?.slice(-10).reverse()

  function handleRedirectToServiceDetails(id: number) {
    Router.push(`/services/${id}`)
  }

  return (
    <Box w="100%" overflowX="scroll">
      {services?.length >= 1 ? (
        <Table
          sx={{
            borderCollapse: 'separate',
            borderSpacing: '0 0.5rem',
          }}
          scrollBehavior={'auto'}
          w="100%"
        >
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Nome</Th>
              <Th>Responsável</Th>
              <Th>Cidade</Th>
              <Th>Status</Th>
              <Th>Pagamento</Th>
            </Tr>
          </Thead>
          <Tbody>
            {servicesFounded !== undefined
              ? servicesFounded
                  .slice(-10)
                  .reverse()
                  .map((service) => (
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
                      <Td>
                        <Link href={`/services/${service.id}`}>
                          {service.id}
                        </Link>
                      </Td>
                      <Td>{service.patient.name}</Td>
                      <Td>{nameFormatter(service.patient.owner)}</Td>
                      <Td>{cityFormatter(service.city.name)}</Td>
                      <Td>
                        <StatusTag
                          color={serviceStatusColor(service.status)}
                          label={serviceStatusFormatter(service.status)}
                        />
                      </Td>
                      <Td>
                        <StatusTag
                          color={paymentStatusColor(service.paymentStatus)}
                          label={paymentStatusFormatter(service.paymentStatus)}
                        />
                      </Td>
                    </Tr>
                  ))
              : lastTenPatients?.map((service) => (
                  <Tr
                    key={service.id}
                    cursor="pointer"
                    onClick={() => handleRedirectToServiceDetails(service.id)}
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
                    <Td>{service.id}</Td>
                    <Td>{service.patient.name}</Td>
                    <Td>{nameFormatter(service.patient.owner)}</Td>
                    <Td>{cityFormatter(service.city.name)}</Td>
                    <Td>
                      <StatusTag
                        color={serviceStatusColor(service.status)}
                        label={serviceStatusFormatter(service.status)}
                      />
                    </Td>
                    <Td>
                      <StatusTag
                        color={paymentStatusColor(service.paymentStatus)}
                        label={paymentStatusFormatter(service.paymentStatus)}
                      />
                    </Td>
                  </Tr>
                ))}
          </Tbody>
        </Table>
      ) : (
        <ErrorOrEmptyMessage
          isEmpty={services?.length === 0}
          isError={services === undefined}
        />
      )}
    </Box>
  )
}
