import { VStack, HStack, Text, Box } from '@chakra-ui/react'
import { ServiceModel } from 'domain/models/ServiceModel'
import { ServicesDetailsCard } from 'pages/staff/components/ServicesDetailsCard'
import { CheckBar } from 'presentation/components/Cards/CheckBar'

interface ServicesCardProps {
  services: ServiceModel[]
}

export function ServicesCard({ services }: ServicesCardProps) {
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
          <Box display="flex" flexDir="column" h="100%" m={0}>
            {services.map((service) => {
              return (
                <CheckBar
                  key={service.id}
                  completed={service.status.toString() === 'COMPLETED'}
                />
              )
            })}
          </Box>
          <ServicesDetailsCard services={services} />
        </HStack>
      </VStack>
    </VStack>
  )
}
