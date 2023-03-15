/* eslint-disable no-extra-boolean-cast */
import { Spinner, Wrap, WrapItem } from '@chakra-ui/react'
import { PatientModel } from 'domain/models/PatientModel'
import { PatientCard } from './components/PatientCard'
import Link from 'next/link'
import { useQuery } from 'react-query'
import { AxiosHttpClient } from './../../infra/http/axios-http-client/axios-http-client'
import { GetServerSideProps } from 'next/types'
import { parseCookies } from 'nookies'

export default function Patients({ patients }) {
  console.log('patients', patients)

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
  const { 'vet.token': token } = parseCookies(ctx)
  const { body: patients } = await axios.request({
    method: 'get',
    url: 'api/patients/v1',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return {
    props: { patients },
  }
}
