import { AxiosHttpClient } from 'infra/http/axios-http-client/axios-http-client'
import { useQuery } from 'react-query'
import { ServiceModel } from 'domain/models/ServiceModel'

export async function GetServices(): Promise<ServiceModel[]> {
  const axios = new AxiosHttpClient(undefined)

  const { body: services } = await axios.request<ServiceModel[]>({
    method: 'get',
    url: 'api/services/v2',
  })

  return services
}

export function useServices() {
  return useQuery(['services'], GetServices, {
    staleTime: 1000 * 60 * 60,
  })
}
