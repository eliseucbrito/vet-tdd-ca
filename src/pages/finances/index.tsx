import { Flex } from '@chakra-ui/react'
import { Container } from 'presentation/components/Defaults/Container'
import { BarChart } from './components/charts/BarChart'
import { LineChart } from './components/charts/LineChart'
import { PieChart } from './components/charts/PieChart'

export default function Finances() {
  return (
    <Container>
      <LineChart />
      <PieChart />
      <BarChart />
    </Container>
  )
}
