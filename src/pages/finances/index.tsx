import { Flex } from '@chakra-ui/react'
import { Container } from 'presentation/components/Defaults/Container'
import { BarChart } from './components/charts/BarChart'
import { BarChartMedicsWithMoreServices } from './components/charts/BarChartMedicsWithMoreServices'
import { LineChartMonthyDayByDay } from './components/charts/LineChartMonthyDayByDay'
import { PieChartDailyIncomes } from './components/charts/PieChartDailyIncomes'
import { PieChartMonthlyIncomes } from './components/charts/PieChartMonthlyIncomes'

export default function Finances() {
  return (
    <Container flexDir="column" justify="space-between" gap={8}>
      <Flex w="100%" gap="1rem" justify="space-between">
        <PieChartDailyIncomes />
        <PieChartMonthlyIncomes />
      </Flex>

      {/* <BarChartMedicsWithMoreServices /> */}

      <Flex w="100%" gap="1rem" justify="space-between">
        <LineChartMonthyDayByDay />
        <BarChart />
      </Flex>
    </Container>
  )
}
