import { HStack } from '@chakra-ui/react'
import { AxiosHttpClient } from 'infra/http/axios-http-client/axios-http-client'
import { GetServerSideProps } from 'next'
import { StaffDetailsCard } from 'presentation/components/Cards/StaffDetailsCard'
import { RolesAndServicesCard } from './components/RolesAndServicesCard'
import { StaffCard } from './components/StaffCard'
import { StaffModel } from 'domain/models/StaffModel'
import { useStaffDetails } from 'presentation/hooks/useStaff'
import { Container } from 'presentation/components/Defaults/Container'
import { ErrorOrEmptyMessage } from 'presentation/components/ErrorOrEmptyMessage'

interface StaffDetailsProps {
  id: string
  staffInitialData: StaffModel
}

export default function StaffDetails({
  id,
  staffInitialData,
}: StaffDetailsProps) {
  const {
    data: staffDetails,
    isSuccess,
    isLoading,
    isError,
  } = useStaffDetails(id, {
    initialData: staffInitialData,
  })

  return (
    <Container flexDir="column" gap={4}>
      {!isSuccess ? (
        <ErrorOrEmptyMessage
          isLoading={isLoading}
          isError={staffDetails === undefined || isError}
        />
      ) : (
        <>
          <HStack w="100%">
            <StaffCard staff={staffDetails} />
            <StaffDetailsCard staff={staffDetails} />
          </HStack>

          <RolesAndServicesCard
            roleHistoric={Array.from(staffDetails?.roleHistoric).reverse()}
            servicesHistoric={staffDetails.servicesList}
          />
        </>
      )}
    </Container>
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
