import { Flex } from '@chakra-ui/react'
import dynamic from 'next/dynamic'
import {
  barChartDataDailyTraffic,
  barChartOptionsDailyTraffic,
} from './../../../../presentation/variables/chart'

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
})

export function BarChart() {
  return (
    <Flex h="400px">
      <ReactApexChart
        options={barChartOptionsDailyTraffic}
        series={barChartDataDailyTraffic}
        type="bar"
      />
    </Flex>
  )
}
