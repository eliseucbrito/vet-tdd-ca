import { HStack, VStack } from '@chakra-ui/react'
import { PatientCard } from './components/PatientCard'
import { ServicesCard } from './components/ServicesCard'
import { GetServerSideProps } from 'next/types'
import { AxiosHttpClient } from './../../infra/http/axios-http-client/axios-http-client'
import { PatientDetailsCard } from 'presentation/components/Cards/PatientDetailsCard'

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
  const { body: patient } = await axios.request({
    method: 'get',
    url: `/api/patients/v1/${id}`,
    headers: {
      Authorization:
        'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsZWFuZHJvIiwicm9sZXMiOlsiQ0VPIiwiR0VORVJBTF9NQU5BR0VSIl0sImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3QiLCJleHAiOjE2Nzg2NzQzNTMsImlhdCI6MTY3ODY3MDc1M30.tX-LcneDHoFdYpL6OeaQ08y1ddKFlCsYqJ3xG7t5Zm0',
    },
  })

  return {
    props: {
      patient,
    },
  }
}
