import { Flex } from '@chakra-ui/react'
import { Sidebar } from 'presentation/components/Sidebar/Sidebar'

export default function Dashboard() {
  return (
    <Flex>
      <Sidebar />
      <Flex>DASHBOARD</Flex>
    </Flex>
  )
}
