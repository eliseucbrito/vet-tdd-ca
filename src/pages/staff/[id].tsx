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
  const axios = new AxiosHttpClient(ctx)
  const { body: staff } = await axios.request({
    method: 'get',
    url: `/api/staff/v2/${id}/details`,
  })

  return {
    props: {
      staff,
    },
  }
}
