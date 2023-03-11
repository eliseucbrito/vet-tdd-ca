import { Flex, HStack, VStack } from '@chakra-ui/react'
import { DetailsCard } from 'presentation/components/Cards/DetailsCard'
import { Sidebar } from 'presentation/components/Sidebar/Sidebar'
import { PatientCard } from './components/PatientCard'

export default function StaffDetails() {
  return (
    <Flex w="100vw" h="100vh">
      <Sidebar />
      <VStack p="1rem 1rem 1rem 1.5rem" w="100%">
        <HStack w="100%">
          <PatientCard />
          <DetailsCard />
        </HStack>
      </VStack>
    </Flex>
  )
}
