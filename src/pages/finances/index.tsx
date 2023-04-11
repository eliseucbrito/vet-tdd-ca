import { Flex } from '@chakra-ui/react'
import { Container } from 'presentation/components/Defaults/Container'
import { BarChart } from './components/charts/BarChart'
import { BarChartBestMedics } from './components/charts/BarChartBestMedics'
import { LineChart } from './components/charts/LineChart'
import { PieChart } from './components/charts/PieChart'
import { PieChartDailyIncomes } from './components/charts/PieChartDailyIncomes'

export default function Finances() {
  return (
    <Container>
      <LineChart />
      <PieChart />
      <BarChart />

      <BarChartBestMedics />

      <PieChartDailyIncomes />
    </Container>
  )
}
