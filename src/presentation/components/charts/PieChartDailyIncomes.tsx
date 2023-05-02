/* eslint-disable no-useless-return */
import { Flex, HStack, Text, VStack, Icon, Box } from '@chakra-ui/react'
import dayjs from 'dayjs'
import dynamic from 'next/dynamic'
import { ErrorOrEmptyMessage } from 'presentation/components/ErrorOrEmptyMessage'
import { useWeeklyEarnings } from 'presentation/hooks/useWeeklyEarnings'
import { pieChartDailyIncomesOptions } from '../../variables/chart'

const isToday = require('dayjs/plugin/isToday')

dayjs.extend(isToday)

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

export function PieChartDailyIncomes() {
  const { data: weeklyEarnings, isError, isLoading } = useWeeklyEarnings()

  if (isError || weeklyEarnings === undefined || isLoading) {
    return (
      <ErrorOrEmptyMessage
        isEmpty={weeklyEarnings === undefined}
        isError={isError}
        isLoading={isLoading}
      />
    )
  }

  const dailyIncomes = weeklyEarnings.dailyIncomes

  const chartSeries = [
    dailyIncomes.exams / 1000,
    dailyIncomes.medicalCare / 1000,
    dailyIncomes.surgerys / 1000,
    dailyIncomes.emergencys / 1000,
  ]
  const totalDailyIncomes = chartSeries.reduce((prev, cur, index) => {
    return prev + cur
  })

  if (totalDailyIncomes === 0) {
    return (
      <Flex
        flexDir="column"
        bg="white"
        w="100%"
        maxW="max-content"
        h="100%"
        borderRadius={12}
        p="1rem"
      >
        <Text fontWeight={600}>Faturamento diário</Text>
        <Text>Sem dados</Text>
      </Flex>
    )
  }

  function numberFormatter(value: number) {
    if (value === 0) {
      return 0
    }
    const valueInReal = value / 1000
    const percent = (valueInReal / totalDailyIncomes) * 100
    return Math.round(percent)
  }

  return (
    <Flex
      bg="white"
      w="100%"
      maxW="max-content"
      h="100%"
      borderRadius={12}
      p="1rem"
    >
      <VStack align="start">
        <Text fontWeight={600}>Faturamento diário</Text>
        <Text fontSize="0.875rem" color="gray.200" lineHeight={1}>
          Total: {totalDailyIncomes}
        </Text>

        <Box w="100%">
          <ReactApexChart
            options={pieChartDailyIncomesOptions}
            series={chartSeries}
            type="pie"
          />
        </Box>
      </VStack>

      <>
        <VStack>
          <SubtitleBlock
            color={ColorsEnum.BLUE}
            label="Exames"
            percent={numberFormatter(dailyIncomes.exams)}
          />

          <SubtitleBlock
            color={ColorsEnum.GREEN}
            label="Atendimentos"
            percent={numberFormatter(dailyIncomes.medicalCare)}
          />

          <SubtitleBlock
            color={ColorsEnum.ORANGE}
            label="Cirurgias"
            percent={numberFormatter(dailyIncomes.surgerys)}
          />

          <SubtitleBlock
            color={ColorsEnum.RED}
            label="Emergências"
            percent={numberFormatter(dailyIncomes.emergencys)}
          />
        </VStack>
      </>
    </Flex>
  )
}
