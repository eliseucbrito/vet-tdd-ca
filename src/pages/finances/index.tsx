import { Flex } from '@chakra-ui/react'
import { Sidebar } from 'presentation/components/Sidebar/Sidebar'
import { LineChart } from './components/charts/LineChart'

export default function Finances() {
  return (
    <Flex w="100vw" h="100vh">
      <Sidebar />
      <Flex p="1rem 1rem 1rem 1.5rem" w="100%" h="100%">
        <LineChart />
      </Flex>
    </Flex>
  )
}
