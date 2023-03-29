import { HStack, VStack } from '@chakra-ui/react'
import { PatientCard } from './components/PatientCard'
import { ServicesCard } from './components/ServicesCard'
import { GetServerSideProps } from 'next/types'
import { AxiosHttpClient } from './../../infra/http/axios-http-client/axios-http-client'
import { PatientDetailsCard } from 'presentation/components/Cards/PatientDetailsCard'
import { parseCookies } from 'nookies'

export default function StaffDetails({ patient }) {
  return (
    <VStack p="1rem 1rem 1rem 1.5rem" gap={4} w="100%">
      <HStack w="100%">
        <PatientCard patient={patient} />
        <PatientDetailsCard patient={patient} />
      </HStack>

      <ServicesCard />
    </VStack>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { id } = ctx.params
  const axios = new AxiosHttpClient()
  const { 'vet.token': token } = parseCookies(ctx)
  const { body: patient } = await axios.request({
    method: 'get',
    url: `/api/patients/v2/${id}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return {
    props: {
      patient,
    },
  }
}
