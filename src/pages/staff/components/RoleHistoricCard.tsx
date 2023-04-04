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
import dayjs from 'dayjs'
import { RoleModel } from 'domain/models/RoleHistoricModel'
import { CheckBar } from 'presentation/components/Cards/CheckBar'
import { ErrorOrEmptyMessage } from 'presentation/components/ErrorOrEmptyMessage'
import { nameFormatter } from 'presentation/utils/nameFormatter'
import { roleFormatter } from 'presentation/utils/roleFormatter'
import { ReactNode } from 'react'
import { FiTrash } from 'react-icons/fi'
import { FormattedNumber, FormattedTime } from 'react-intl'

interface RoleDetailBlockProps {
  children: ReactNode
  last?: boolean
}

function RoleDetailBlock({ children, last }: RoleDetailBlockProps) {
  return (
    <VStack
      align="center"
      h="100%"
      paddingX={5}
      borderRight={last ? 'none' : '1px solid #A0A1A3'}
    >
      {children}
    </VStack>
  )
}

interface RoleHistoricProps {
  roleHistoric: RoleModel[]
}

export function RoleHistoricCard({ roleHistoric }: RoleHistoricProps) {
  const firstRole = roleHistoric.length - 1

  return (
    <HStack w="100%" gap={10}>
      {roleHistoric.length >= 1 ? (
        <>
          <VStack h="100%" spacing={0}>
            {roleHistoric.map((role, index) => (
              <CheckBar key={role.id} completed={index !== 0} />
            ))}
          </VStack>

          <Table
            sx={{
              borderCollapse: 'separate',
              borderSpacing: '0 0.5rem',
            }}
            scrollBehavior={'auto'}
          >
            <Thead display="none">
              <Th>Data</Th>
              <Th>Antigo cargo</Th>
              <Th>Novo cargo</Th>
              <Th>Salário</Th>
              <Th>Carga horária</Th>
              <Th>Promovido por</Th>
            </Thead>
            <Tbody>
              {roleHistoric.map((role, index) => (
                <Tr
                  key={role.id}
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
                    <RoleDetailBlock>
                      <Text fontSize="1.25rem">
                        {dayjs(role.startedIn).format("DD MMMM[']YY")}{' '}
                      </Text>
                    </RoleDetailBlock>
                  </Td>

                  <Td px={2}>
                    {index !== firstRole && (
                      <RoleDetailBlock>
                        <Text>Antigo Cargo</Text>
                        <Text fontWeight={600}>
                          {roleFormatter(
                            roleHistoric[index + 1].role.description,
                          )}
                        </Text>
                      </RoleDetailBlock>
                    )}
                  </Td>

                  <Td px={2}>
                    <RoleDetailBlock>
                      <Text>Novo Cargo</Text>
                      <Text fontWeight={600}>
                        {roleFormatter(role.role.description)}
                      </Text>
                    </RoleDetailBlock>
                  </Td>

                  <Td px={2}>
                    <RoleDetailBlock>
                      <Text>Salário</Text>
                      <HStack>
                        {index !== firstRole && (
                          <Text color="gray.400">
                            <FormattedNumber
                              value={roleHistoric[index + 1].baseSalary / 1000}
                              currency="BRL"
                              maximumFractionDigits={2}
                              minimumFractionDigits={2}
                              style={'currency'}
                            />
                          </Text>
                        )}

                        <Text fontWeight={600}>
                          <FormattedNumber
                            value={role.baseSalary / 1000}
                            currency="BRL"
                            maximumFractionDigits={2}
                            minimumFractionDigits={2}
                            style={'currency'}
                          />
                        </Text>
                      </HStack>
                    </RoleDetailBlock>
                  </Td>

                  <Td px={2}>
                    <RoleDetailBlock>
                      <Text>Carga Horária</Text>
                      <HStack>
                        {index !== firstRole && (
                          <Text color="gray.400">
                            {Math.floor(
                              roleHistoric[index + 1].weeklyWorkLoad / 60,
                            )}
                            h
                          </Text>
                        )}

                        <Text fontWeight={600}>
                          {Math.floor(role.weeklyWorkLoad / 60)}h
                        </Text>
                      </HStack>
                    </RoleDetailBlock>
                  </Td>

                  <Td px={2}>
                    <RoleDetailBlock last>
                      <Text>Promovido(a) por</Text>
                      <Text
                        as={Link}
                        href={`/staff/${role.promoter.id}`}
                        fontWeight={600}
                      >
                        {nameFormatter(role.promoter.fullName)}
                      </Text>
                    </RoleDetailBlock>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </>
      ) : (
        <ErrorOrEmptyMessage
          isEmpty={roleHistoric.length === 0}
          isError={roleHistoric === undefined}
        />
      )}
    </HStack>
  )
}
