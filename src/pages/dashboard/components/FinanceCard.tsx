import {
  Flex,
  Stat,
  StatArrow,
  StatGroup,
  StatHelpText,
  StatLabel,
  StatNumber,
  Text,
  VStack,
} from '@chakra-ui/react'
import { ApexOptions } from 'apexcharts'
import dayjs from 'dayjs'
import dynamic from 'next/dynamic'
import { StatsIndicator } from 'presentation/components/Stats/StatsIndicator'
import { useWeeklyEarnings } from 'presentation/hooks/weeklyEarnings'
require('dayjs/locale/pt-br')

const Chart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
})

const lastSevenDaysName: Array<string> = []

dayjs.locale('pt-br')

for (let index = 6; index > -1; index--) {
  const dayName = dayjs().subtract(index, 'days').locale('pt').format('dddd')

  lastSevenDaysName.push(dayName)
}

export const lineAreaChartOptionsTotalSpent: ApexOptions = {
  chart: {
    type: 'area',
    toolbar: {
      show: false,
    },
    dropShadow: {
      enabled: true,
      top: 13,
      left: 0,
      blur: 10,
      opacity: 0.1,
      color: '#4318FF',
    },
  },
  colors: ['#4318FF', '#39B8FF'],
  markers: {
    size: 0,
    colors: 'white',
    strokeColors: '#7551FF',
    strokeWidth: 3,
    strokeOpacity: 0.9,
    strokeDashArray: 0,
    fillOpacity: 1,
    discrete: [],
    shape: 'circle',
    radius: 2,
    offsetX: 0,
    offsetY: 0,
    showNullDataPoints: true,
  },
  tooltip: {
    theme: 'dark',
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: 'smooth',
  },
  xaxis: {
    categories: lastSevenDaysName,
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
    labels: {
      show: false,
    },
  },
  yaxis: {
    show: false,
  },
  grid: {
    show: false,
  },
  legend: {
    show: false,
  },
}

export function FinanceCard() {
  const { data: weeklyEarnings } = useWeeklyEarnings()
  console.log('EARNINGS SEMANANIS', weeklyEarnings?.incomes)

  const seriesIncomes = [
    {
      name: 'Faturamento',
      data:
        weeklyEarnings !== undefined
          ? weeklyEarnings.incomes
          : [0, 0, 0, 0, 0, 0, 0, 0],
    },
    {
      name: 'Despesas',
      data:
        weeklyEarnings !== undefined
          ? weeklyEarnings.outcomes
          : [0, 0, 0, 0, 0, 0, 0, 0],
    },
  ]

  return (
    <Flex
      bg="white"
      align="center"
      justify="space-between"
      w="100%"
      borderRadius={12}
    >
      <Chart
        height="100%"
        w="120%"
        type="area"
        options={lineAreaChartOptionsTotalSpent}
        series={seriesIncomes}
      />
      <VStack align="start" px={2}>
        <StatsIndicator
          label="Faturamento semanal"
          stat={1200}
          newValue={[weeklyEarnings?.incomes[6]]}
          oldValue={[weeklyEarnings?.incomes[5]]}
        />
      </VStack>
    </Flex>
  )
}
