import { Flex, HStack, Text, VStack } from '@chakra-ui/react'
import { CheckBar } from 'presentation/components/Cards/CheckBar'
import { useState } from 'react'
import { RoleHistoricCard } from './RoleHistoricCard'
import { ServicesDetailsCard } from './ServicesDetailsCard'

export function RolesAndServicesCard() {
  const [displayedData, setDisplayedData] = useState(1)

  return (
    <VStack align="start" minW="100%" bg="white" p={4} borderRadius={12}>
      <HStack bg="gray.300" p={2} mb={2} borderRadius={6}>
        <Text
          as={'button'}
          onClick={() => setDisplayedData(1)}
          bg={displayedData === 1 ? 'white' : 'none'}
          p="0.5rem 1rem"
          borderRadius={6}
          transition="all 0.5s"
        >
          Trajetória na empresa
        </Text>
        <Text
          as={'button'}
          onClick={() => setDisplayedData(2)}
          bg={displayedData === 2 ? 'white' : 'none'}
          p="0.5rem 1rem"
          borderRadius={6}
          transition="all 0.5s"
        >
          Atendimentos
        </Text>
      </HStack>
      <VStack bg="gray.300" p={2} w="100%" spacing={0} borderRadius={12}>
        {displayedData === 1 ? (
          <HStack w="100%" gap={10} justify="space-between">
            <CheckBar completed />
            <RoleHistoricCard />
          </HStack>
        ) : (
          <HStack w="100%" gap={10} justify="space-between">
            <CheckBar completed />
            <ServicesDetailsCard />
          </HStack>
        )}
      </VStack>
    </VStack>
  )
}
