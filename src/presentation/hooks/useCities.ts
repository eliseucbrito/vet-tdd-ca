import { api } from 'infra/http/axios-http-client/axios-http-client'
import { useQuery } from 'react-query'
import { CityModel } from 'domain/models/CityModel'

export async function GetCities(): Promise<CityModel[]> {
  const { data: cities } = await api.request<CityModel[]>({
    method: 'get',
    url: 'api/cities/v2',
  })

  return cities
}

export function useCities() {
  return useQuery(['cities'], GetCities, {
    staleTime: 1000 * 60 * 60,
  })
}