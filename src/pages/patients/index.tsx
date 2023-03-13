/* eslint-disable no-extra-boolean-cast */
import { Spinner, Wrap, WrapItem } from '@chakra-ui/react'
import { PatientModel } from 'domain/models/PatientModel'
import { PatientCard } from './components/PatientCard'
import Link from 'next/link'
import { useQuery } from 'react-query'
import { AxiosHttpClient } from './../../infra/http/axios-http-client/axios-http-client'
import { GetServerSideProps } from 'next/types'

export default function Patients({ patients }) {
  return (
    <Wrap
      flexWrap="wrap"
      align="start"
      p="1rem 1rem 1rem 1.5rem"
      w="100%"
      h="100%"
      spacing={6}
    >
      {patients === undefined ? (
        <Spinner />
      ) : (
        patients.map((patient) => (
          <WrapItem key={patient.id}>
            <Link href={`/patients/${patient.id}`}>
              <PatientCard rounded patient={patient} />
            </Link>
          </WrapItem>
        ))
      )}
    </Wrap>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const axios = new AxiosHttpClient()
  const { body: patients } = await axios.request({
    method: 'get',
    url: '/api/patients/v1',
    headers: {
      Authorization:
        'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsZWFuZHJvIiwicm9sZXMiOlsiQ0VPIiwiR0VORVJBTF9NQU5BR0VSIl0sImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3QiLCJleHAiOjE2Nzg2NzQzNTMsImlhdCI6MTY3ODY3MDc1M30.tX-LcneDHoFdYpL6OeaQ08y1ddKFlCsYqJ3xG7t5Zm0',
    },
  })

  return {
    props: {
      patients,
    },
  }
}
