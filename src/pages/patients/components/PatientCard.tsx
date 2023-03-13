import {
  Avatar,
  Flex,
  HStack,
  Spinner,
  Tag,
  Text,
  VStack,
} from '@chakra-ui/react'
import { PatientModel } from 'domain/models/PatientModel'

interface PatientCardProps {
  rounded?: boolean
  patient: PatientModel
}

export function PatientCard({ rounded, patient }: PatientCardProps) {
  return (
    <VStack
      w="max-content"
      py={6}
      px={8}
      bg="white"
      borderLeftRadius="2xl"
      borderRightRadius={rounded ? '2xl' : 0}
    >
      {patient === undefined ? (
        <Spinner />
      ) : (
        <>
          <Avatar size="lg" src={patient.avatarUrl} />
          <Text lineHeight={1} whiteSpace="nowrap">
            {patient.name}
          </Text>
          <Text variant="subtitle" whiteSpace="nowrap" lineHeight={1}>
            {patient.owner}
          </Text>
          <Tag
            bg="green.600"
            color="white"
            fontWeight={600}
            px={4}
            aria-label="Raça do animal"
          >
            {patient.breed}
          </Tag>
          <HStack>
            <Text fontWeight={600}>ID</Text>
            <Text fontWeight={600}>{patient.id}</Text>
          </HStack>
        </>
      )}
    </VStack>
  )
}
