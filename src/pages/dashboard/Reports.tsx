import { Flex, Text, VStack, Icon, textDecoration } from '@chakra-ui/react'
import { FiPlus } from 'react-icons/fi'
import { FcSalesPerformance, FcDocument } from 'react-icons/fc'
import { ReportModel, ReportTypes } from 'domain/models/ReportModel'
import Link from 'next/link'

export function Reports() {
  const reports: Array<ReportModel> = []

  return (
    <VStack w="100%">
      <Flex
        w="100%"
        p={2}
        borderRadius={12}
        justify="space-between"
        align="center"
        bg="white"
      >
        <Text>Relatórios</Text>
        <Icon bg="green.600" borderRadius="full" boxSize={5} as={FiPlus} />
      </Flex>

      {reports.map((report) => (
        <Flex
          key={report.id}
          w="100%"
          p={2}
          borderRadius={12}
          fontSize="sm"
          justify="space-between"
          align="center"
          bg="white"
        >
          <VStack align="start">
            <Text>{report.title}</Text>
            <Text variant="subtitle" fontSize="0.625rem">
              {report.createdAt.toLocaleDateString()}
            </Text>
          </VStack>

          <VStack align="end">
            <Icon
              as={
                report.type === ReportTypes.PAYMENT
                  ? FcSalesPerformance
                  : FcDocument
              }
              boxSize={6}
            />
            <Text
              as={Link}
              href={`/reports/${report.id}`}
              fontSize="0.625rem"
              color="green.200"
            >
              Detalhes
            </Text>
          </VStack>
        </Flex>
      ))}
    </VStack>
  )
}
