import { Flex } from '@chakra-ui/react'
import { BarChart } from './components/charts/BarChart'
import { LineChart } from './components/charts/LineChart'
import { PieChart } from './components/charts/PieChart'

export default function Finances() {
  return (
    <Flex p="1rem 1rem 1rem 1.5rem" w="100%" h="100%">
      <LineChart />
      <PieChart />
      <BarChart />
    </Flex>
  )
}
