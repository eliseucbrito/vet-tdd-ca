import { Flex, HStack, Text, VStack } from '@chakra-ui/react'
import { RoleModel } from 'domain/models/RoleHistoricModel'
import { ServiceModel } from 'domain/models/ServiceModel'
import { CheckBar } from 'presentation/components/Cards/CheckBar'
import { ErrorOrEmptyMessage } from 'presentation/components/ErrorOrEmptyMessage'
import { useServices } from 'presentation/hooks/useServices'
import { useState } from 'react'
import { RoleHistoricCard } from './RoleHistoricCard'
import { ServicesDetailsCard } from './ServicesDetailsCard'

interface RoleAndServicesProps {
  roleHistoric: RoleModel[]
  servicesHistoric: ServiceModel[]
}

export function RolesAndServicesCard({
  roleHistoric,
  servicesHistoric,
}: RoleAndServicesProps) {
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
          <RoleHistoricCard roleHistoric={roleHistoric} />
        ) : (
          <ServicesDetailsCard services={servicesHistoric} />
        )}
      </VStack>
    </VStack>
  )
}
