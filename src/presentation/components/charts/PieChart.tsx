import { Flex } from '@chakra-ui/react'
import dynamic from 'next/dynamic'
import { pieChartData, pieChartOptions } from '../../variables/chart'

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
})

export function PieChart() {
  return (
    <Flex h="400px">
      <ReactApexChart
        options={pieChartOptions}
        series={pieChartData}
        type="pie"
      />
    </Flex>
  )
}
