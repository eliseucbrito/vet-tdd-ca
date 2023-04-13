import {
  Flex,
  Icon,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  VStack,
} from '@chakra-ui/react'
import dayjs from 'dayjs'
import { ServiceModel } from 'domain/models/ServiceModel'
import Link from 'next/link'
import { nameFormatter } from 'presentation/utils/nameFormatter'
import {
  serviceStatusColor,
  serviceStatusFormatter,
} from 'presentation/utils/serviceStatusFormatter'

interface ServicesProps {
  services: ServiceModel[]
}

export function ServicesList({ services }: ServicesProps) {
  return (
    <VStack w="100%" h="100%">
      <Table>
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Paciente</Th>
            <Th>Responsável</Th>
            <Th>Data</Th>
            <Th>Médico</Th>
            <Th>Status</Th>
          </Tr>
        </Thead>
        <Tbody>
          {services?.map((service) => {
            return (
              <Tr key={service.id}>
                <Td>
                  <Link href={`/services/${service.id}`}>{service.id}</Link>
                </Td>
                <Td>
                  <Link href={`/patients/${service.patient.id}`}>
                    {service.patient.name}
                  </Link>
                </Td>
                <Td>{nameFormatter(service.patient.owner)}</Td>
                <Td>
                  {dayjs(service.serviceDate).format('DD[/]MM[/]YYYY HH:mm')}
                </Td>
                <Td>{nameFormatter(service.medic.fullName)}</Td>
                <Td
                  display="flex"
                  alignItems="center"
                  gap={1}
                  _before={{
                    content: '""',
                    width: '0.5rem',
                    height: '0.5rem',
                    backgroundColor: serviceStatusColor(service.status),
                    borderRadius: '100%',
                  }}
                >
                  {serviceStatusFormatter(service.status)}
                </Td>
              </Tr>
            )
          })}
        </Tbody>
      </Table>
    </VStack>
  )
}
