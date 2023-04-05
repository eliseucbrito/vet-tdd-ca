import { AxiosHttpClient } from 'infra/http/axios-http-client/axios-http-client'
import { useQuery, UseQueryOptions } from 'react-query'
import { CityModel } from 'domain/models/CityModel'

export async function GetCities(): Promise<CityModel[]> {
  const axios = new AxiosHttpClient(undefined)

  const { body: cities } = await axios.request<CityModel[]>({
    method: 'get',
    url: 'api/cities/v2',
  })

  return cities
}

export function useCities(options?: UseQueryOptions) {
  return useQuery(['cities'], GetCities, {
    staleTime: 1000 * 60 * 60,
    ...options,
  })
}
