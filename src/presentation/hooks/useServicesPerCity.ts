import { CityModel } from 'domain/models/CityModel'
import { ServiceStatus } from 'domain/models/ServiceModel'
import { AxiosHttpClient } from 'infra/http/axios-http-client/axios-http-client'
import { isInLast30Days } from 'presentation/utils/isInLast30Days'
import { useQuery } from 'react-query'
import { GetCities, useCities } from './useCities'
import { GetServices, useServices } from './useServices'

type GetServicesPerCityProps = {
  dailyServicesPerCity: {
    [cityName: string]: number
  }
  monthlyServicesPerCity: {
    [cityName: string]: number
  }
}

export async function GetServicesPerCity(): Promise<GetServicesPerCityProps> {
  const cities = await GetCities()
  const services = await GetServices()

  const dailyServicesPerCity = {}
  const monthlyServicesPerCity = {}

  cities?.forEach((city) => {
    dailyServicesPerCity[city.name] = 0
    monthlyServicesPerCity[city.name] = 0
  })

  services?.forEach((service) => {
    const serviceDate = new Date(service.serviceDate).toDateString()
    const todayDate = new Date().toDateString()
    if (
      serviceDate === todayDate &&
      service.status === ServiceStatus.COMPLETED
    ) {
      dailyServicesPerCity[service.city.name] += 1
    }
    if (
      isInLast30Days(service.serviceDate) &&
      service.status === ServiceStatus.COMPLETED
    ) {
      monthlyServicesPerCity[service.city.name] += 1
    }
  })

  return {
    dailyServicesPerCity,
    monthlyServicesPerCity,
  }
}

export function useServicesPerCity() {
  return useQuery(['servicesPerCity'], GetServicesPerCity, {
    staleTime: 1000 * 60 * 60,
  })
}
