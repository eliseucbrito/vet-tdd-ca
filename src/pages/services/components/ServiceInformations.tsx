import { Box, Divider, HStack, Text, VStack } from '@chakra-ui/react'
import dayjs from 'dayjs'
import { ServiceModel } from 'domain/models/ServiceModel'
import { cityFormatter } from 'presentation/utils/cityFormatter'
import { kindFormatter } from 'presentation/utils/kindFormatter'
import { phoneFormatter } from 'presentation/utils/phoneFormatter'
import { serviceStatusFormatter } from 'presentation/utils/serviceStatusFormatter'
import { serviceTypeFormatter } from 'presentation/utils/serviceTypeFormatter'
import { sexFormatter } from 'presentation/utils/sexFormatter'

interface ServiceInformationsProps {
  service: ServiceModel
}

interface ServiceInformationBlockProps {
  label: string
  data: string
  first?: boolean
}

function ServiceInformationBlock({
  data,
  label,
  first,
}: ServiceInformationBlockProps) {
  return (
    <HStack align="start">
      {!first && (
        <Divider orientation="vertical" h="1rem" borderColor="black" />
      )}
      <Box>
        <Text fontSize="0.75rem" fontWeight={600}>
          {label}
        </Text>
        <Text>{data}</Text>
      </Box>
    </HStack>
  )
}

export function ServiceInformations({ service }: ServiceInformationsProps) {
  console.log('SERVICE RECEIVED ', service)

  return (
    <VStack
      w="100%"
      sx={{
        span: { fontSize: '0.75rem', display: 'block', fontWeight: 600 },
      }}
    >
      <HStack borderTop="1px" w="100%" justify="space-between" px="0.25rem">
        <ServiceInformationBlock
          first
          label="Paciente"
          data={service.patient.name}
        />

        <ServiceInformationBlock
          label="Espécie"
          data={kindFormatter(service.patient.kind)}
        />

        <ServiceInformationBlock label="Raça" data={service.patient.breed} />

        <ServiceInformationBlock
          label="Sexo"
          data={sexFormatter(service.patient.sex)}
        />

        <ServiceInformationBlock
          label="Nascimento"
          data={new Date(service.patient.birthDate).toLocaleDateString()}
        />
      </HStack>

      <HStack borderTop="1px" w="100%" justify="space-between" px="0.25rem">
        <ServiceInformationBlock
          first
          label="Tutor"
          data={service.patient.owner}
        />

        <ServiceInformationBlock
          label="Contato"
          data={phoneFormatter(service.patient.ownerContact)}
        />

        <ServiceInformationBlock
          label="Status"
          data={serviceStatusFormatter(service.status)}
        />

        <ServiceInformationBlock
          label="Criado em"
          data={dayjs(service.createdAt).format('DD[/]MM[/]YYYY HH:mm')}
        />
      </HStack>

      <HStack borderTop="1px" w="100%" justify="space-between" px="0.25rem">
        <ServiceInformationBlock
          first
          label="Médico Veterinário"
          data={service.medic.fullName}
        />

        <ServiceInformationBlock
          label="Serviço"
          data={serviceTypeFormatter(service.type)}
        />

        <ServiceInformationBlock
          label="Realizado em"
          data={dayjs(service.serviceDate).format('DD/MM/YYYY HH:mm')}
        />

        <ServiceInformationBlock
          label="Cidade de Atendimento"
          data={cityFormatter(service.city.name)}
        />
      </HStack>
    </VStack>
  )
}
