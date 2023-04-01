import {
  Box,
  Divider,
  Flex,
  Spinner,
  Text,
  TextProps,
  VStack,
} from '@chakra-ui/react'
import dayjs from 'dayjs'
import { StaffModel } from 'domain/models/StaffModel'
import { cpfFormatter } from 'presentation/utils/cpfFormatter'
import { ReactElement, ReactNode } from 'react'
import { FormattedNumber } from 'react-intl'

interface CardDetailProps {
  label: string
  data: ReactNode
}

interface DetailsCardProps {
  staff: StaffModel
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

export function StaffDetailsCard({ staff }: DetailsCardProps) {
  const salaryIntl = (
    <FormattedNumber
      value={staff.baseSalary / 1000}
      currency="BRL"
      maximumFractionDigits={2}
      minimumFractionDigits={2}
      style={'currency'}
    />
  )

  const bonusIntl = (
    <FormattedNumber
      value={staff.baseSalary / 10000}
      currency="BRL"
      maximumFractionDigits={2}
      minimumFractionDigits={2}
      style={'currency'}
    />
  )

  function vacationFormatter(date: string) {
    const dateInJs = dayjs(date)
    const dateNum = dateInJs.get('date')
    const monthNum = dateInJs.get('month')

    const newDate = dayjs(new Date())
      .set('date', dateNum)
      .set('month', monthNum)
    return newDate.toDate().toLocaleDateString()
  }

  return (
    <Flex
      bg="white"
      h="100%"
      w="100%"
      justify="space-between"
      p={4}
      borderRightRadius={12}
    >
      {staff === undefined ? (
        <Spinner />
      ) : (
        <>
          <VStack w="30%" justify="space-between">
            <CardDetail
              label="Entrou em"
              data={new Date(staff.createdAt).toLocaleDateString()}
            />
            <CardDetail label="CPF" data={cpfFormatter(staff.cpf)} />
            <CardDetail label="ID" data={staff.id} />
          </VStack>

          <VStack w="30%" justify="space-between">
            <CardDetail label="Horas Faltantes" data="(87) 9.9999-9999" />
            <CardDetail
              label="Carga Horária"
              data={`${staff.weeklyWorkLoad / 60}h/sem`}
            />
            <CardDetail
              label="Horas Trabalhadas"
              data={`${staff.workLoadCompleted / 60}h/${
                staff.weeklyWorkLoad / 60
              }h`}
            />
          </VStack>

          <VStack w="30%" justify="space-between">
            <CardDetail label="Salário Base" data={salaryIntl} />
            <CardDetail label="Bônus Anual" data={bonusIntl} />
            <CardDetail
              label="Próximas Ferias"
              data={vacationFormatter(staff.createdAt)}
            />
          </VStack>
        </>
      )}
    </Flex>
  )
}
