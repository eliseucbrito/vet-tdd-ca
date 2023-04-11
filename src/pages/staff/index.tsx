import { Heading, Spinner, Text, Wrap, WrapItem } from '@chakra-ui/react'
import React from 'react'
import { StaffCard } from './components/StaffCard'
import Link from 'next/link'
import { GetServerSideProps } from 'next/types'
import { AxiosHttpClient } from './../../infra/http/axios-http-client/axios-http-client'
import { StaffModel, StaffReducedModel } from 'domain/models/StaffModel'
import { parseCookies } from 'nookies'
import { ErrorOrEmptyMessage } from 'presentation/components/ErrorOrEmptyMessage'
import { Container } from 'presentation/components/Defaults/Container'
import Head from 'next/head'
import { NewStaffModal } from 'presentation/components/Modals/NewStaffModal'
import { useStaff } from 'presentation/hooks/useStaff'

interface StaffProps {
  staffsInitialData: StaffReducedModel[]
}

export default function Staff({ staffsInitialData }: StaffProps) {
  const { data: staffs } = useStaff()

  return (
    <Container flexDir="column">
      <Heading display="flex" justifyContent="space-between">
        <Text>Staff</Text>

        <NewStaffModal />
      </Heading>
      <Wrap
        flexWrap="wrap"
        align="start"
        p="1rem 1rem 1rem 1.5rem"
        w="100%"
        h="100%"
        spacing={8}
      >
        {staffs.length >= 1 ? (
          staffs.map((staff) => (
            <WrapItem key={staff.id}>
              <Link href={`/staff/${staff.id}`}>
                <StaffCard rounded staff={staff} />
              </Link>
            </WrapItem>
          ))
        ) : (
          <ErrorOrEmptyMessage
            isEmpty={staffs?.length === 0}
            isError={staffs === undefined}
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
