import { useQuery } from 'react-query'
import { ServiceModel } from 'domain/models/ServiceModel'
import { PatientModel } from 'domain/models/PatientModel'
import { AxiosHttpClient } from 'infra/http/axios-http-client/axios-http-client'

export async function GetPatients(): Promise<PatientModel[]> {
  const axios = new AxiosHttpClient(undefined)

  const { body: patients } = await axios.request<PatientModel[]>({
    method: 'get',
    url: 'api/patients/v2',
  })

  return patients
}

export function usePatients() {
  return useQuery(['patients'], GetPatients, {
    staleTime: 1000 * 60 * 60,
  })
}
