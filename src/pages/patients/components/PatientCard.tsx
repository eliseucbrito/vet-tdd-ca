import { Avatar, Flex, HStack, Tag, Text, VStack } from '@chakra-ui/react'

interface PatientCardProps {
  rounded?: boolean
}

export function PatientCard({ rounded }: PatientCardProps) {
  return (
    <VStack
      w="max-content"
      py={6}
      px={8}
      bg="white"
      borderLeftRadius="2xl"
      borderRightRadius={rounded ? '2xl' : 0}
    >
      <Avatar size="lg" />
      <Text lineHeight={1} whiteSpace="nowrap">
        Nome do paciente
      </Text>
      <Text variant="subtitle" lineHeight={1}>
        Dono
      </Text>
      <Tag
        bg="green.600"
        color="white"
        fontWeight={600}
        px={4}
        aria-label="Raça do animal"
      >
        Poodle
      </Tag>
      <HStack>
        <Text fontWeight={600}>ID</Text>
        <Text fontWeight={600}>2</Text>
      </HStack>
    </VStack>
  )
}
