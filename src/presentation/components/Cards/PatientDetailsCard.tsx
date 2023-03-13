import { Box, Divider, Flex, Text, TextProps, VStack } from '@chakra-ui/react'
import { ReactElement, ReactNode } from 'react'
import { PatientModel } from 'domain/models/PatientModel'

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
        <CardDetail label="Entrou em" data={patient.createdAt} />
        <CardDetail label="Dono" data={patient.owner} />
        <CardDetail label="Contato" data={patient.ownerContact} />
      </VStack>

      <VStack w="30%" justify="space-between">
        <CardDetail label="ID" data={patient.id} />
        <CardDetail label="Tipo" data={patient.kind} />
        <CardDetail label="Nascimento" data={patient.birthDate} />
      </VStack>

      <VStack w="30%" justify="space-between">
        <CardDetail label="Sexo" data={patient.sex} />
        <CardDetail label="Raça" data={patient.breed} />
        <CardDetail label="Idade" data="19 anos" />
      </VStack>
    </Flex>
  )
}
