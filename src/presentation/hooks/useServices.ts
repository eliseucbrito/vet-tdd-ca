import { AxiosHttpClient } from 'infra/http/axios-http-client/axios-http-client'
import { useQuery, UseQueryOptions } from 'react-query'
import { ServiceModel } from 'domain/models/ServiceModel'

export async function GetServices(): Promise<ServiceModel[]> {
  const axios = new AxiosHttpClient(undefined)

  const { body: services } = await axios.request<ServiceModel[]>({
    method: 'get',
    url: 'api/services/v2',
  })

  return services
}

export async function GetServiceDetails(id: string): Promise<ServiceModel> {
  const axios = new AxiosHttpClient(undefined)

  const { body: service } = await axios.request<ServiceModel>({
    method: 'get',
    url: `api/services/v2/${id}`,
  })

  return service
}

export function useServices(options?: UseQueryOptions) {
  return useQuery(['services'], GetServices, {
    staleTime: 1000 * 60 * 60,
  })
}

export function useServiceDetails(id: string, options?: UseQueryOptions) {
  return useQuery(['service', { id }], () => GetServiceDetails(id), {
    staleTime: 1000 * 60 * 60,
  })
}
