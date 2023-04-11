import { Container } from 'presentation/components/Defaults/Container'
import { BarChart } from './components/charts/BarChart'
import { BarChartMedicsWithMoreServices } from './components/charts/BarChartMedicsWithMoreServices'
import { PieChartDailyIncomes } from './components/charts/PieChartDailyIncomes'

export default function Finances() {
  return (
    <Container>
      <BarChart />

      <BarChartMedicsWithMoreServices />

      <PieChartDailyIncomes />
    </Container>
  )
}
