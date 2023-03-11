import { Flex } from '@chakra-ui/react'
import {
  barChartOptionsDailyTraffic,
  barChartDataDailyTraffic,
  barChartOptionsConsumption,
  pieChartOptions,
  pieChartData,
  lineChartOptionsTotalSpent,
  lineChartDataTotalSpent,
  TesteLineChart1,
  testeData,
} from 'presentation/variables/chart'
import dynamic from 'next/dynamic'

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
})

export function LineChart() {
  return (
    <Flex h="400px">
      <ReactApexChart
        options={TesteLineChart1}
        series={testeData}
        type="area"
        width="100%"
        height="100%"
      />
    </Flex>
  )
}
