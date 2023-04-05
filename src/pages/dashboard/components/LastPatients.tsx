import { Table, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react'
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

interface LastPatientsProps {
  services: ServiceModel[]
}

export function LastPatients({ services }: LastPatientsProps) {
  const lastTenPatients = services?.slice(-10).reverse()

  return services?.length >= 1 ? (
    <Table
      sx={{
        borderCollapse: 'separate',
        borderSpacing: '0 0.5rem',
      }}
      scrollBehavior={'auto'}
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
        {lastTenPatients.map((service) => (
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
              <Link href={`/services/${service.id}`}>{service.id}</Link>
            </Td>
            <Td>{service.patient.name}</Td>
            <Td>{nameFormatter(service.patient.owner)}</Td>
            <Td>{cityFormatter(service.city.name)}</Td>
            <Td
              display="flex"
              alignItems="center"
              gap={1}
              _before={{
                content: '""',
                width: '0.5rem',
                height: '0.5rem',
                backgroundColor: serviceStatusColor(service.status),
                borderRadius: '100%',
              }}
            >
              {serviceStatusFormatter(service.status)}
            </Td>
            <Td>
              <Text
                display="flex"
                alignItems="center"
                gap={1}
                _before={{
                  content: '""',
                  width: '0.5rem',
                  height: '0.5rem',
                  backgroundColor: paymentStatusColor(service.paymentStatus),
                  borderRadius: '100%',
                }}
              >
                {paymentStatusFormatter(service.paymentStatus)}
              </Text>
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
  )
}
