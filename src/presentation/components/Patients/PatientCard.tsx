import { Avatar, HStack, Tag, Text, VStack } from '@chakra-ui/react'
import { PatientReducedModel } from 'domain/models/PatientModel'
import { ErrorOrEmptyMessage } from 'presentation/components/ErrorOrEmptyMessage'
import { nameFormatter } from 'presentation/utils/nameFormatter'

interface PatientCardProps {
  rounded?: boolean
  patient: PatientReducedModel
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
      {patient ? (
        <>
          <Avatar size="lg" src={'https://github.com/eliseubrito7z.png'} />
          <Text lineHeight={1} whiteSpace="nowrap">
            {patient.name}
          </Text>
          <Text variant="subtitle" whiteSpace="nowrap" lineHeight={1}>
            {nameFormatter(patient.owner)}
          </Text>
          <Tag
            bg="green.600"
            color="white"
            fontWeight={600}
            px={4}
            aria-label="Raça do animal"
            textAlign="center"
          >
            {patient.breed}
          </Tag>
          <HStack>
            <Text fontWeight={600}>ID</Text>
            <Text fontWeight={600}>{patient.id}</Text>
          </HStack>
        </>
      ) : (
        <ErrorOrEmptyMessage isError={true} />
      )}
    </VStack>
  )
}
