import { VStack, HStack, Text } from '@chakra-ui/react'
import { ServicesDetailsCard } from 'pages/staff/components/ServicesDetailsCard'
import { CheckBar } from 'presentation/components/Cards/CheckBar'

export function ServicesCard() {
  return (
    <VStack align="start" minW="100%" bg="white" p={4} borderRadius={12}>
      <HStack bg="gray.300" p={2} mb={2} borderRadius={6}>
        <Text
          bg={'white'}
          p="0.5rem 1rem"
          borderRadius={6}
          transition="all 0.5s"
        >
          Atendimentos
        </Text>
      </HStack>
      <VStack bg="gray.300" p={2} w="100%" spacing={0} borderRadius={12}>
        <HStack w="100%" gap={10} justify="space-between">
          <CheckBar completed />
          <ServicesDetailsCard />
        </HStack>
      </VStack>
    </VStack>
  )
}
