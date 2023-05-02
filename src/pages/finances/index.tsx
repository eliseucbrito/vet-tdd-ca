import { Flex } from '@chakra-ui/react'
import { Container } from 'presentation/components/Defaults/Container'
import { BarChart } from '../../presentation/components/charts/BarChart'
import { BarChartMonthlyServicesPerCity } from '../../presentation/components/charts/BarChartMonthlyServicesPerCity'
import { LineChartMonthyDayByDay } from '../../presentation/components/charts/LineChartMonthyDayByDay'
import { PieChartDailyIncomes } from '../../presentation/components/charts/PieChartDailyIncomes'
import { PieChartMonthlyIncomes } from '../../presentation/components/charts/PieChartMonthlyIncomes'

export default function Finances() {
  return (
    <Container flexDir="column" justify="space-between" gap={8}>
      <Flex w="100%" gap="1rem" justify="space-between">
        <BarChart />
        <BarChartMonthlyServicesPerCity />

        <PieChartMonthlyIncomes />
      </Flex>

      {/* <BarChartMedicsWithMoreServices /> */}

      <Flex w="100%" gap="1rem" justify="space-between">
        <LineChartMonthyDayByDay />
        <PieChartDailyIncomes />
      </Flex>
    </Container>
  )
}
