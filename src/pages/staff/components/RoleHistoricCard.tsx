import {
  Checkbox,
  Divider,
  Flex,
  HStack,
  Link,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
} from '@chakra-ui/react'
import { ReactNode } from 'react'
import { FiTrash } from 'react-icons/fi'

interface RoleDetailBlockProps {
  children: ReactNode
  last?: boolean
}

function RoleDetailBlock({ children, last }: RoleDetailBlockProps) {
  return (
    <HStack h="100%" align="center" justify="center">
      <VStack align="start">{children}</VStack>

      {!last && <Divider orientation="vertical" py={7} />}
    </HStack>
  )
}

export function RoleHistoricCard() {
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
            <RoleDetailBlock>
              <Text>23 Jan'23</Text>
            </RoleDetailBlock>
          </Td>

          <Td px={2} textAlign="center">
            <RoleDetailBlock>
              <Text>Antigo Cargo</Text>
              <Text fontWeight={600}>Veterinario</Text>
            </RoleDetailBlock>
          </Td>

          <Td px={2} textAlign="center">
            <RoleDetailBlock>
              <Text>Novo Cargo</Text>
              <Text fontWeight={600}>Gerente</Text>
            </RoleDetailBlock>
          </Td>

          <Td px={2} textAlign="center">
            <RoleDetailBlock>
              <Text>Salário</Text>
              <HStack>
                <Text color="gray.400">R$ 1.200,00</Text>

                <Text fontWeight={600}>R$ 2.000,00</Text>
              </HStack>
            </RoleDetailBlock>
          </Td>

          <Td px={2} textAlign="center">
            <RoleDetailBlock>
              <Text>Carga Horária</Text>
              <HStack>
                <Text color="gray.400">20h</Text>

                <Text fontWeight={600}>30h</Text>
              </HStack>
            </RoleDetailBlock>
          </Td>

          <Td px={2} textAlign="center">
            <RoleDetailBlock last>
              <Text>Promovido(a) por</Text>
              <Text as={Link} href={`/staff/${99}`} fontWeight={600}>
                Jubilau Costa
              </Text>
            </RoleDetailBlock>
          </Td>
        </Tr>
      </Tbody>
    </Table>
  )
}
