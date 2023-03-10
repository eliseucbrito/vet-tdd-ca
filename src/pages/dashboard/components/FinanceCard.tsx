import { Flex, Text, VStack } from '@chakra-ui/react'
import { ApexOptions } from 'apexcharts'
import dynamic from 'next/dynamic'

const Chart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
})

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
    type: 'numeric',
    labels: {
      show: false,
    },
    axisBorder: {
      show: false,
    },
    axisTicks: {
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
        height="70%"
        w="100%"
        type="area"
        options={lineAreaChartOptionsTotalSpent}
        series={seriesIncomes}
      />
      <VStack align="start" px={4}>
        <Text variant="subtitle">Estatísticas Semanal</Text>
        <Text fontSize="1.5rem" fontWeight={700}>
          R$ 1.297,53
        </Text>
      </VStack>
    </Flex>
  )
}
