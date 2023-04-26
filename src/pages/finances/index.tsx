import { Container } from 'presentation/components/Defaults/Container'
import { BarChart } from './components/charts/BarChart'
import { BarChartMedicsWithMoreServices } from './components/charts/BarChartMedicsWithMoreServices'
import { PieChartDailyIncomes } from './components/charts/PieChartDailyIncomes'
import { PieChartMonthlyIncomes } from './components/charts/PieChartMonthlyIncomes'

export default function Finances() {
  return (
    <Container justify="space-between">
      <BarChart />

      <BarChartMedicsWithMoreServices />

      <PieChartDailyIncomes />
      <PieChartMonthlyIncomes />
    </Container>
  )
}
