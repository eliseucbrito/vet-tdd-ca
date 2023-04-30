import { Box, Flex } from '@chakra-ui/react'
import { ApexGeneric } from 'presentation/variables/chart'
import dynamic from 'next/dynamic'
import { useDetailedMonthlyEarnings } from 'presentation/hooks/useMonthlyEarnings'

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
})

export function LineChartMonthyDayByDay() {
  const { data: detailedEarnings } = useDetailedMonthlyEarnings()

  const DatesOfEarnings =
    detailedEarnings?.map((d) => d.date) ?? Array(31).fill(0)

  const lineChartOptionsEarningsDayPerDay: ApexGeneric = {
    chart: {
      type: 'area',
      fontFamily: 'Poppins, sans-serif',
      zoom: {
        enabled: true,
      },
      dropShadow: {
        enabled: true,
        enabledSeries: [0],
        top: -2,
        left: 2,
        blur: 5,
        opacity: 0.06,
      },
    },
    colors: ['#4318FF', '#39B8FF'],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
      width: 3,
    },
    title: {
      text: 'Faturamentos e Gastos - Últimos 30 dias',
      align: 'left',
    },
    grid: {
      row: {
        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
        opacity: 0.5,
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    xaxis: {
      categories: DatesOfEarnings,
    },
    yaxis: {
      tickAmount: 10,
    },
  }

  const seriesData = [
    {
      name: 'Faturamento',
      data: detailedEarnings?.map((date) => date.incomes),
    },
    {
      name: 'Gastos',
      data: detailedEarnings?.map((date) => date.outcomes),
    },
  ]

  return (
    <Flex w="62%" bg="white" h="max-content" borderRadius={12} p="1rem">
      <Box w="100%">
        <ReactApexChart
          options={lineChartOptionsEarningsDayPerDay}
          series={seriesData}
          type="area"
        />
      </Box>
    </Flex>
  )
}
