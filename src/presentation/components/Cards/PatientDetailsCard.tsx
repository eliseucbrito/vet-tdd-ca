import { Box, Divider, Flex, Text, VStack } from '@chakra-ui/react'
import { ReactNode } from 'react'
import { PatientModel } from 'domain/models/PatientModel'
import { phoneFormatter } from 'presentation/utils/phoneFormatter'
import { ageFormatter } from 'presentation/utils/ageFormatter'
import { sexFormatter } from 'presentation/utils/sexFormatter'
import { kindFormatter } from 'presentation/utils/kindFormatter'

interface CardDetailProps {
  label: string
  data: ReactNode
}

interface DetailsCardProps {
  patient: PatientModel
}

function CardDetail({ label, data }: CardDetailProps) {
  return (
    <Box w="100%">
      <Text fontWeight={600} color="gray.500" whiteSpace="nowrap">
        {label}
      </Text>
      <Text fontSize="sm">{data}</Text>
      <Divider />
    </Box>
  )
}

export function PatientDetailsCard({ patient }: DetailsCardProps) {
  return (
    <Flex
      bg="white"
      h="100%"
      w="100%"
      justify="space-between"
      p={4}
      borderRightRadius={12}
    >
      <VStack w="30%" justify="space-between">
        <CardDetail
          label="Entrou em"
          data={new Date(patient.createdAt).toLocaleDateString()}
        />
        <CardDetail label="Dono" data={patient.owner} />
        <CardDetail
          label="Contato"
          data={phoneFormatter(patient.ownerContact)}
        />
      </VStack>

      <VStack w="30%" justify="space-between">
        <CardDetail label="ID" data={patient.id} />
        <CardDetail
          label="Tipo"
          data={kindFormatter(patient.kind.toString())}
        />
        <CardDetail
          label="Nascimento"
          data={new Date(patient.birthDate).toLocaleDateString()}
        />
      </VStack>

      <VStack w="30%" justify="space-between">
        <CardDetail label="Sexo" data={sexFormatter(patient.sex)} />
        <CardDetail label="Raça" data={patient.breed} />
        <CardDetail label="Idade" data={ageFormatter(patient.birthDate)} />
      </VStack>
    </Flex>
  )
}
