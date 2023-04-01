import { Flex, Text, VStack, Icon, textDecoration } from '@chakra-ui/react'
import { FiPlus } from 'react-icons/fi'
import { FcSalesPerformance, FcDocument } from 'react-icons/fc'
import { ReportModel, ReportTypes } from 'domain/models/ReportModel'
import Link from 'next/link'
import { NewReportModal } from 'presentation/components/Modals/NewReportModal'
import dayjs from 'dayjs'

interface ReportsProps {
  reports: ReportModel[]
}

export function Reports({ reports }: ReportsProps) {
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
        <NewReportModal />
      </Flex>

      {reports?.map((report) => (
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
              {dayjs(report.createdAt).format(
                'DD [de] MMMM [de] YYYY [ás] HH:mm',
              )}
            </Text>
          </VStack>

          <VStack align="end">
            <Icon
              as={
                report.type.toString() === 'PAYMENT'
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
