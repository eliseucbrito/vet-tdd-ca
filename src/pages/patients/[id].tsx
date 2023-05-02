import { HStack } from '@chakra-ui/react'
import { PatientCard } from '../../presentation/components/Patients/PatientCard'
import { GetServerSideProps } from 'next/types'
import { AxiosHttpClient } from './../../infra/http/axios-http-client/axios-http-client'
import { PatientDetailsCard } from 'presentation/components/Cards/PatientDetailsCard'
import { useServices } from 'presentation/hooks/useServices'
import { Container } from 'presentation/components/Defaults/Container'
import { ServicesCard } from 'presentation/components/Patients/ServicesCard'

export default function StaffDetails({ patient }) {
  const { data: services } = useServices()

  return (
    <Container flexDir="column" gap={4}>
      <HStack w="100%">
        <PatientCard patient={patient} />
        <PatientDetailsCard patient={patient} />
      </HStack>

      <ServicesCard services={services} />
    </Container>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { id } = ctx.params
  const axios = new AxiosHttpClient(ctx)
  const { body: patient } = await axios.request({
    method: 'get',
    url: `/api/patients/v2/${id}`,
  })

  return {
    props: {
      patient,
    },
  }
}
