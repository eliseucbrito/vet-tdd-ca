import { Table, Tbody, Td, Th, Thead, Tr, VStack } from '@chakra-ui/react'
import dayjs from 'dayjs'
import { ServiceModel } from 'domain/models/ServiceModel'
import Link from 'next/link'
import Router from 'next/router'
import { StatusTag } from 'presentation/components/Stats/StatusTag'
import { nameFormatter } from 'presentation/utils/nameFormatter'
import {
  serviceStatusColor,
  serviceStatusFormatter,
} from 'presentation/utils/serviceStatusFormatter'

interface ServicesProps {
  services: ServiceModel[]
}

export function ServicesList({ services }: ServicesProps) {
  function handleRedirectToServiceDetails(id: number) {
    Router.push(`/services/${id}`)
  }

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
              <Tr
                key={service.id}
                cursor="pointer"
                onClick={() => handleRedirectToServiceDetails(service.id)}
              >
                <Td>{service.id}</Td>
                <Td>{service.patient.name}</Td>
                <Td>{nameFormatter(service.patient.owner)}</Td>
                <Td>
                  {dayjs(service.serviceDate).format('DD[/]MM[/]YYYY HH:mm')}
                </Td>
                <Td>{nameFormatter(service.medic.fullName)}</Td>
                <Td>
                  <StatusTag
                    color={serviceStatusColor(service.status)}
                    label={serviceStatusFormatter(service.status)}
                  />
                </Td>
              </Tr>
            )
          })}
        </Tbody>
      </Table>
    </VStack>
  )
}
