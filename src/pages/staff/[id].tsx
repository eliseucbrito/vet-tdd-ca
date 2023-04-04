import { HStack, Spinner, VStack } from '@chakra-ui/react'
import { AxiosHttpClient } from 'infra/http/axios-http-client/axios-http-client'
import { GetServerSideProps } from 'next'
import { StaffDetailsCard } from 'presentation/components/Cards/StaffDetailsCard'
import { RolesAndServicesCard } from './components/RolesAndServicesCard'
import { StaffCard } from './components/StaffCard'
import { StaffModel } from 'domain/models/StaffModel'
import { useStaffDetails } from 'presentation/hooks/useStaff'

interface StaffDetailsProps {
  id: string
  staffInitialData: StaffModel
}

export default function StaffDetails({
  id,
  staffInitialData,
}: StaffDetailsProps) {
  const { data: staffDetails, isFetching } = useStaffDetails(id, {
    initialData: staffInitialData,
  })

  const roleHistoricReverted = Array.from(
    staffDetails?.roleHistoric ?? [],
  ).reverse()

  return (
    <VStack p="1rem 1rem 1rem 1.5rem" gap={4} w="100%">
      {isFetching ? (
        <Spinner />
      ) : (
        <>
          <HStack w="100%">
            <StaffCard staff={staffDetails} />
            <StaffDetailsCard staff={staffDetails} />
          </HStack>

          <RolesAndServicesCard
            roleHistoric={roleHistoricReverted}
            servicesHistoric={staffDetails.servicesList}
          />
        </>
      )}
    </VStack>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { id } = ctx.params
  const axios = new AxiosHttpClient(ctx)
  const { body: staffInitialData } = await axios.request({
    method: 'get',
    url: `/api/staff/v2/${id}/details`,
  })

  return {
    props: {
      id,
      staffInitialData,
    },
  }
}
