/* eslint-disable no-extra-boolean-cast */
import { Wrap, WrapItem } from '@chakra-ui/react'
import { PatientReducedModel } from 'domain/models/PatientModel'
import { PatientCard } from './components/PatientCard'
import Link from 'next/link'
import { AxiosHttpClient } from './../../infra/http/axios-http-client/axios-http-client'
import { GetServerSideProps } from 'next/types'
import { ErrorOrEmptyMessage } from 'presentation/components/ErrorOrEmptyMessage'

interface PatientsProps {
  patients: PatientReducedModel[]
}

export default function Patients({ patients }: PatientsProps) {
  return (
    <Wrap
      flexWrap="wrap"
      align="start"
      p="1rem 1rem 1rem 1.5rem"
      w="100%"
      h="100%"
      spacing={6}
    >
      {patients.length >= 1 ? (
        patients.map((patient) => (
          <WrapItem key={patient.id}>
            <Link href={`/patients/${patient.id}`}>
              <PatientCard rounded patient={patient} />
            </Link>
          </WrapItem>
        ))
      ) : (
        <ErrorOrEmptyMessage isError={patients === undefined} isEmpty={patients?.length === 0} />
      )}
    </Wrap>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const axios = new AxiosHttpClient(ctx)
  const { body: patients } = await axios.request({
    method: 'get',
    url: 'api/patients/v2',
  })

  return {
    props: { patients },
  }
}
