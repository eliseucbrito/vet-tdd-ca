/* eslint-disable no-useless-return */
import { Flex, HStack, Text, VStack, Icon } from '@chakra-ui/react'
import dynamic from 'next/dynamic'
import { ErrorOrEmptyMessage } from 'presentation/components/ErrorOrEmptyMessage'
import { useMonthlyEarnings } from 'presentation/hooks/useMonthlyEarnings'
import { pieChartDailyIncomesOptions } from '../../../../presentation/variables/chart'

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
})

enum ColorsEnum {
  BLUE = 'BLUE',
  GREEN = 'GREEN',
  ORANGE = 'ORANGE',
  RED = 'RED',
}

interface SubtitleBlockProps {
  label: string
  percent: number
  color: ColorsEnum
}

function SubtitleBlock({ label, percent, color }: SubtitleBlockProps) {
  return (
    <VStack>
      <HStack>
        <Icon viewBox="0 0 200 200" color={color}>
          <path
            fill="currentColor"
            d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
          />
        </Icon>
        <Text color="gray.200" fontWeight={600}>
          {label}
        </Text>
      </HStack>

      <Text fontWeight={600}>{percent}%</Text>
    </VStack>
  )
}

export function PieChartMonthlyIncomes() {
  const { data: monthlyEarnings, isError, isLoading } = useMonthlyEarnings()

  if (isError || monthlyEarnings === undefined || isLoading) {
    return (
      <ErrorOrEmptyMessage
        isEmpty={monthlyEarnings === undefined}
        isError={isError}
        isLoading={isLoading}
      />
    )
  }

  const totalEarningsInLast30Days = monthlyEarnings.totalEarningsInLast30Days

  const chartSeries = [
    monthlyEarnings.incomesPerType.EXAM,
    monthlyEarnings.incomesPerType.MEDICAL_CARE,
    monthlyEarnings.incomesPerType.SURGERY,
    monthlyEarnings.incomesPerType.EMERGENCY,
  ]

  function numberFormatter(value: number) {
    const valueInReals = value
    const percent = (valueInReals / totalEarningsInLast30Days) * 100
    return Math.round(percent)
  }

  return (
    <Flex bg="white" w="max-content" h="max-content" borderRadius={12} p="1rem">
      <VStack align="start">
        <Text fontWeight={600}>Faturamento mensal</Text>

        <ReactApexChart
          options={pieChartDailyIncomesOptions}
          series={chartSeries}
          type="pie"
        />
      </VStack>

      {!!monthlyEarnings && (
        <>
          <VStack>
            <SubtitleBlock
              color={ColorsEnum.BLUE}
              label="Exames"
              percent={numberFormatter(monthlyEarnings.incomesPerType.EXAM)}
            />

            <SubtitleBlock
              color={ColorsEnum.GREEN}
              label="Atendimentos"
              percent={numberFormatter(
                monthlyEarnings.incomesPerType.MEDICAL_CARE,
              )}
            />

            <SubtitleBlock
              color={ColorsEnum.ORANGE}
              label="Cirurgias"
              percent={numberFormatter(monthlyEarnings.incomesPerType.SURGERY)}
            />

            <SubtitleBlock
              color={ColorsEnum.RED}
              label="Emergências"
              percent={numberFormatter(
                monthlyEarnings.incomesPerType.EMERGENCY,
              )}
            />
          </VStack>
        </>
      )}
    </Flex>
  )
}
