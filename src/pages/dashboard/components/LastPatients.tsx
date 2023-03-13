import { Table, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react'
import Link from 'next/link'

// id - name - owner - city - status - payment status

const mockServices = [
  {
    id: 1,
    name: 'Diggle',
    owner: 'Eliseu Cordeiro',
    city: 'Araripina-PE',
    status: 'Em progresso',
    payment: 'Aguardando',
  },
  {
    id: 2,
    name: 'Baiano',
    owner: 'Eliseu Cordeiro',
    city: 'Trindade-PE',
    status: 'Em progresso',
    payment: 'Aguardando',
  },
]

export function LastPatients() {
  return (
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
        {mockServices.slice(0, 10).map((service) => (
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
            <Td>{service.name}</Td>
            <Td>{service.owner}</Td>
            <Td>{service.city}</Td>
            <Td
              display="flex"
              alignItems="center"
              gap={1}
              _before={{
                content: '""',
                width: '0.5rem',
                height: '0.5rem',
                backgroundColor: 'red',
                borderRadius: '100%',
              }}
            >
              {service.status}
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
                  backgroundColor: 'red',
                  borderRadius: '100%',
                }}
              >
                {service.payment}
              </Text>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  )
}
