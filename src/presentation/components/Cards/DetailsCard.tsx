import { Box, Divider, Flex, Text, TextProps, VStack } from '@chakra-ui/react'
import { ReactElement, ReactNode } from 'react'

interface CardDetailProps {
  label: string
  data: ReactNode
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

export function DetailsCard() {
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
        <CardDetail label="Entrou em" data="20/10/2019" />
        <CardDetail label="CPF" data="123.456.789-0" />
        <CardDetail label="ID" data="1" />
      </VStack>

      <VStack w="30%" justify="space-between">
        <CardDetail label="Telefone" data="(87) 9.9999-9999" />
        <CardDetail label="Carga Horária" data="40h/sem" />
        <CardDetail label="Horas Trabalhadas" data="20h/40h" />
      </VStack>

      <VStack w="30%" justify="space-between">
        <CardDetail label="Salário Base" data="R$ 19.000,00" />
        <CardDetail label="Bônus Anual" data="R$ 1.900,00" />
        <CardDetail label="Próximas Ferias" data="20/10/2023" />
      </VStack>
    </Flex>
  )
}
