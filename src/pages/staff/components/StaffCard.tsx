import {
  Avatar,
  Divider,
  Flex,
  HStack,
  Tag,
  Text,
  VStack,
} from '@chakra-ui/react'

interface StaffCardProps {
  rounded?: boolean
}

export function StaffCard({ rounded }: StaffCardProps) {
  return (
    <VStack
      w="max-content"
      h="max-content"
      py={6}
      px={8}
      bg="white"
      borderLeftRadius="2xl"
      borderRightRadius={rounded ? '2xl' : 0}
    >
      <Avatar size="lg" />
      <Text lineHeight={1} whiteSpace="nowrap">
        Nome Completo Aqui
      </Text>
      <Text variant="subtitle" whiteSpace="nowrap" fontSize="xs" lineHeight={1}>
        seuemail@gmail.com
      </Text>
      <Tag
        bg="green.600"
        color="white"
        fontWeight={600}
        px={4}
        aria-label="Raça do animal"
      >
        CEO & CTO
      </Tag>
      <HStack>
        <VStack>
          <Text fontWeight={600}>ID</Text>
          <Text fontWeight={600}>2</Text>
        </VStack>

        <Divider />

        <VStack>
          <Text fontWeight={600}>Plantão</Text>
          <Text fontWeight={600}>Sim</Text>
        </VStack>
      </HStack>
    </VStack>
  )
}
