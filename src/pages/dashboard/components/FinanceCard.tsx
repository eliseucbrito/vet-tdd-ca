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

const seriesIncomes = [
  {
    name: 'Faturamento',
    data: [1, 2, 3, 4, 5, 6, 7],
  },
  {
    name: 'Despesas',
    data: [9, 8, 7, 6, 5, 4, 3],
  },
]

export function FinanceCard() {
  return (
    <Flex
      bg="white"
      align="center"
      justify="space-between"
      w="100%"
      borderRadius={12}
    >
      <Chart
        height="80%"
        w="100%"
        type="area"
        options={lineAreaChartOptionsTotalSpent}
        series={seriesIncomes}
      />
      <VStack align="start" px={2}>
        {/* <StatGroup>
          <Stat>
            <StatLabel color="gray.200">Receita Semanal</StatLabel>
            <StatNumber fontSize="1.2 5rem">R$ 1.297,53</StatNumber>
            <StatHelpText>
              <StatArrow type="increase" />
              23.36%
            </StatHelpText>
          </Stat>
        </StatGroup> */}
        <StatsIndicator
          label="teste"
          stat={1200}
          newValue={[250, 250, 252]}
          oldValue={[250, 250]}
        />
      </VStack>
    </Flex>
  )
}
