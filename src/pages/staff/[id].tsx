import { HStack, Spinner, VStack } from '@chakra-ui/react'
import { AxiosHttpClient } from 'infra/http/axios-http-client/axios-http-client'
import { GetServerSideProps } from 'next'
import { StaffDetailsCard } from 'presentation/components/Cards/StaffDetailsCard'
import { RolesAndServicesCard } from './components/RolesAndServicesCard'
import { StaffCard } from './components/StaffCard'
import { StaffModel } from 'domain/models/StaffModel'

interface StaffDetailsProps {
  staff: StaffModel
}

export default function StaffDetails({ staff }: StaffDetailsProps) {
  return (
    <VStack p="1rem 1rem 1rem 1.5rem" gap={4} w="100%">
      <HStack w="100%">
        <StaffCard staff={staff} />
        <StaffDetailsCard staff={staff} />
      </HStack>

      <RolesAndServicesCard />
    </VStack>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { id } = ctx.params
  const axios = new AxiosHttpClient()
  const { body: staff } = await axios.request({
    method: 'get',
    url: `/api/staff/v1/${id}`,
    headers: {
      Authorization:
        'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsZWFuZHJvIiwicm9sZXMiOlsiQ0VPIiwiR0VORVJBTF9NQU5BR0VSIl0sImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3QiLCJleHAiOjE2Nzg2Nzk4ODMsImlhdCI6MTY3ODY3NjI4M30.oic7PLQQ332DbpIN36nrBHL5E8Iqvt3MuiJk4WveHzU',
    },
  })

  return {
    props: {
      staff,
    },
  }
}
