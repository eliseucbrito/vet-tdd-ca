import { useQuery, UseQueryOptions } from 'react-query'
import { ServiceModel } from 'domain/models/ServiceModel'
import { PatientModel, PatientReducedModel } from 'domain/models/PatientModel'
import { AxiosHttpClient } from 'infra/http/axios-http-client/axios-http-client'

export async function GetPatients(): Promise<PatientReducedModel[]> {
  const axios = new AxiosHttpClient(undefined)

  const { body: patients } = await axios.request<PatientReducedModel[]>({
    method: 'get',
    url: 'api/patients/v2',
  })

  return patients
}

export async function GetPatientDetails(id: string): Promise<PatientModel[]> {
  const axios = new AxiosHttpClient(undefined)

  const { body: patient } = await axios.request<PatientModel[]>({
    method: 'get',
    url: `api/patients/v2/${id}`,
  })

  return patient
}

export function usePatients(options?: UseQueryOptions) {
  return useQuery(['patients'], GetPatients, {
    staleTime: 1000 * 60 * 60,
    ...options,
  })
}

export function usePatientDetails(id: string, options?: UseQueryOptions) {
  return useQuery(['patient', id], () => GetPatientDetails(id), {
    staleTime: 1000 * 60 * 60,
    ...options,
  })
}
