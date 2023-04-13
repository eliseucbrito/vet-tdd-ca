import {
  Heading,
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
import Router from 'next/router'
import { Container } from 'presentation/components/Defaults/Container'
import { ErrorOrEmptyMessage } from 'presentation/components/ErrorOrEmptyMessage'
import { useReports } from 'presentation/hooks/useReports'
import { nameFormatter } from 'presentation/utils/nameFormatter'
import { reportTypeFormatter } from 'presentation/utils/reportTypeFormatter'

export default function Reports() {
  const { data, isError, isFetching, isSuccess } = useReports()

  const isEmpty = data !== undefined && !(data.length > 0)

  function handleRedirectToReportDetails(id: number) {
    Router.push(`/reports/${id}`)
  }

  return (
    <Container flexDir="column">
      <Heading
        fontWeight={600}
        fontSize="1.5rem"
        color="green.900"
        lineHeight={1}
        pb={4}
      >
        Relatórios
      </Heading>
      {!isSuccess || isEmpty ? (
        <ErrorOrEmptyMessage
          isError={isError}
          isLoading={isFetching}
          isEmpty={isEmpty}
        />
      ) : (
        <Table>
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Tipo</Th>
              <Th>Titulo</Th>
              <Th>Criado em</Th>
              <Th>Solicitante</Th>
              <Th>Status</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((report) => {
              return (
                <Tr
                  key={report.id}
                  cursor="pointer"
                  onClick={() => handleRedirectToReportDetails(report.id)}
                >
                  <Td>{report.id}</Td>
                  <Td>{reportTypeFormatter(report.type.toString())}</Td>
                  <Td>
                    <Text noOfLines={1}>{report.title}</Text>
                  </Td>
                  <Td>
                    {dayjs(report.createdAt).format('DD[/]MM[/]YYYY HH:mm')}
                  </Td>
                  <Td>{nameFormatter(report.createdBy.fullName)}</Td>
                  <Td>
                    {report.approved === null
                      ? '------'
                      : report.approved
                      ? 'Aprovado'
                      : 'Negado'}
                  </Td>
                </Tr>
              )
            })}
          </Tbody>
        </Table>
      )}
    </Container>
  )
}
