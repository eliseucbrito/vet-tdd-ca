import { Spinner, Wrap, WrapItem } from '@chakra-ui/react'
import React from 'react'
import { StaffCard } from './components/StaffCard'
import Link from 'next/link'
import { GetServerSideProps } from 'next/types'
import { AxiosHttpClient } from './../../infra/http/axios-http-client/axios-http-client'
import { StaffModel } from 'domain/models/StaffModel'
import { parseCookies } from 'nookies'

interface StaffProps {
  staffs: StaffModel[]
}

export default function Staff({ staffs }: StaffProps) {
  console.log(staffs)

  return (
    <Wrap
      flexWrap="wrap"
      align="start"
      p="1rem 1rem 1rem 1.5rem"
      w="100%"
      h="100%"
      spacing={8}
    >
      {staffs === undefined ? (
        <Spinner />
      ) : (
        staffs.map((staff) => (
          <WrapItem key={staff.id}>
            <Link href={`/staff/${staff.id}`}>
              <StaffCard rounded staff={staff} />
            </Link>
          </WrapItem>
        ))
      )}
    </Wrap>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const axios = new AxiosHttpClient()
  const { 'vet.token': token } = parseCookies(ctx)
  const { body: staffs } = await axios.request({
    method: 'get',
    url: 'api/staff/v1',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return {
    props: { staffs },
  }
}
