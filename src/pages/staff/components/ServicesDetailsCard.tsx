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
import Link from 'next/link'
import { ReactNode } from 'react'

interface ServiceDetailsBlockProps {
  children: ReactNode
  last?: boolean
}

function ServiceDetailsBlock({ children, last }: ServiceDetailsBlockProps) {
  return (
    <HStack align="start" justify="space-between" w="max-content">
      <VStack align="start">{children}</VStack>

      {!last && <Divider orientation="vertical" py={7} />}
    </HStack>
  )
}

export function ServicesDetailsCard() {
  return (
    <Table
      sx={{
        borderCollapse: 'separate',
        borderSpacing: '0 0.5rem',
      }}
      scrollBehavior={'auto'}
    >
      <Tbody>
        <Tr
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
              <Text>23 Jan'23</Text>
              <Text variant="subtitle-12" lineHeight={0.5}>
                Concluído
              </Text>
            </ServiceDetailsBlock>
          </Td>

          <Td px={2} textAlign="center">
            <ServiceDetailsBlock>
              <Text>ID</Text>
              <Text fontWeight={600}>19</Text>
            </ServiceDetailsBlock>
          </Td>

          <Td px={2} textAlign="center">
            <ServiceDetailsBlock>
              <Text>Cidade</Text>
              <Text fontWeight={600}>Jaqueriguaguara</Text>
            </ServiceDetailsBlock>
          </Td>

          <Td px={2} textAlign="center">
            <ServiceDetailsBlock>
              <Text>Serviço</Text>
              <Text fontWeight={600}>Atendimento Médico</Text>
            </ServiceDetailsBlock>
          </Td>

          <Td px={2} textAlign="center">
            <ServiceDetailsBlock last>
              <Text>Paciente</Text>
              <Text fontWeight={600}>Jubilau Santo</Text>
            </ServiceDetailsBlock>
          </Td>
        </Tr>
      </Tbody>
    </Table>
  )
}
