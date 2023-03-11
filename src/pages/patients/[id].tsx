import { HStack, VStack } from '@chakra-ui/react'
import { DetailsCard } from 'presentation/components/Cards/DetailsCard'
import { PatientCard } from './components/PatientCard'

export default function StaffDetails() {
  return (
    <VStack p="1rem 1rem 1rem 1.5rem" w="100%">
      <HStack w="100%">
        <PatientCard />
        <DetailsCard />
      </HStack>
    </VStack>
  )
}
