/* eslint-disable no-extra-boolean-cast */
import { Heading, Text, Wrap, WrapItem } from '@chakra-ui/react'
import { PatientReducedModel } from 'domain/models/PatientModel'
import { PatientCard } from './components/PatientCard'
import Link from 'next/link'
import { AxiosHttpClient } from './../../infra/http/axios-http-client/axios-http-client'
import { GetServerSideProps } from 'next/types'
import { ErrorOrEmptyMessage } from 'presentation/components/ErrorOrEmptyMessage'
import { Container } from 'presentation/components/Defaults/Container'
import { PatientSearchBar } from 'presentation/components/Form/PatientSeachBar'
import { useContext } from 'react'
import { SearchContext } from 'presentation/context/SearchContext'

interface PatientsProps {
  patientsInitialData: PatientReducedModel[]
}

export default function Patients({ patientsInitialData }: PatientsProps) {
  const { patientsFounded } = useContext(SearchContext)

  return (
    <Container overflowY="scroll" display="block">
      <Heading display="flex" mb="1rem" justifyContent="space-between">
        <Text>Pacientes</Text>
      </Heading>

      <PatientSearchBar />

      <Wrap align="start" w="100%" spacing={6}>
        {patientsFounded ? (
          patientsFounded.map((patient) => (
            <WrapItem key={patient.id}>
              <Link href={`/patients/${patient.id}`}>
                <PatientCard rounded patient={patient} />
              </Link>
            </WrapItem>
          ))
        ) : patientsInitialData ? (
          patientsInitialData.map((patient) => (
            <WrapItem key={patient.id}>
              <Link href={`/patients/${patient.id}`}>
                <PatientCard rounded patient={patient} />
              </Link>
            </WrapItem>
          ))
        ) : (
          <ErrorOrEmptyMessage
            isError={patientsInitialData === undefined}
            isEmpty={patientsInitialData?.length === 0}
          />
        )}
      </Wrap>
    </Container>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const axios = new AxiosHttpClient(ctx)
  const { body: patients } = await axios.request({
    method: 'get',
    url: 'api/patients/v2',
  })

  return {
    props: { patientsInitialData: patients },
  }
}
