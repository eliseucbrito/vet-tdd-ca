import { Heading, Text, Wrap, WrapItem } from '@chakra-ui/react'
import React, { useContext } from 'react'
import Link from 'next/link'
import { GetServerSideProps } from 'next/types'
import { AxiosHttpClient } from './../../infra/http/axios-http-client/axios-http-client'
import { StaffReducedModel } from 'domain/models/StaffModel'
import { ErrorOrEmptyMessage } from 'presentation/components/ErrorOrEmptyMessage'
import { Container } from 'presentation/components/Defaults/Container'
import { NewStaffModal } from 'presentation/components/Modals/NewStaffModal'
import { StaffSearchBar } from 'presentation/components/Form/StaffSearchBar'
import { SearchContext } from 'presentation/context/SearchContext'
import { StaffCard } from 'presentation/components/Staff/StaffCard'

interface StaffProps {
  staffsInitialData: StaffReducedModel[]
}

export default function Staff({ staffsInitialData }: StaffProps) {
  const { staffsFounded } = useContext(SearchContext)

  return (
    <Container display="block">
      <Heading display="flex" mb="1rem" justifyContent="space-between">
        <Text>Staff</Text>

        <NewStaffModal />
      </Heading>
      <StaffSearchBar />
      <Wrap flexWrap="wrap" align="start" w="100%" h="100%" spacing={8}>
        {staffsFounded ? (
          staffsFounded.map((staff) => (
            <WrapItem key={staff.id}>
              <Link href={`/staff/${staff.id}`}>
                <StaffCard rounded staff={staff} />
              </Link>
            </WrapItem>
          ))
        ) : staffsInitialData !== undefined ? (
          staffsInitialData.map((staff) => (
            <WrapItem key={staff.id}>
              <Link href={`/staff/${staff.id}`}>
                <StaffCard rounded staff={staff} />
              </Link>
            </WrapItem>
          ))
        ) : (
          <ErrorOrEmptyMessage
            isEmpty={
              staffsFounded?.length === 0 || staffsInitialData?.length === 0
            }
            isError={
              staffsFounded === undefined || staffsInitialData === undefined
            }
          />
        )}
      </Wrap>
    </Container>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const axios = new AxiosHttpClient(ctx)
  const { body: staffs } = await axios.request({
    method: 'get',
    url: 'api/staff/v2',
  })

  return {
    props: { staffsInitialData: staffs },
  }
}
