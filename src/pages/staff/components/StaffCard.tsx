import { Avatar, Divider, HStack, Tag, Text, VStack } from '@chakra-ui/react'
import { StaffModel } from 'domain/models/StaffModel'

interface StaffCardProps {
  rounded?: boolean
  staff: StaffModel
}

export function StaffCard({ rounded, staff }: StaffCardProps) {
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
        {staff.fullName}
      </Text>
      <Text variant="subtitle" whiteSpace="nowrap" fontSize="xs" lineHeight={1}>
        {staff.email}
      </Text>
      <Tag bg="green.600" color="white" fontWeight={600} px={4}>
        {staff.role.description}
      </Tag>
      <HStack>
        <VStack>
          <Text fontWeight={600}>ID</Text>
          <Text fontWeight={600}>{staff.id}</Text>
        </VStack>

        <Divider />

        <VStack>
          <Text fontWeight={600}>Plantão</Text>
          <Text fontWeight={600}>{staff.onDuty}</Text>
        </VStack>
      </HStack>
    </VStack>
  )
}
