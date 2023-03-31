import { api } from 'infra/http/axios-http-client/axios-http-client'
import { useQuery } from 'react-query'
import { ServiceModel } from 'domain/models/ServiceModel'

type VetData = {
  clients: {
    total: number
    today: number
  }

  staff: {
    total: number
    onDuty: number
  }

  patients: {
    total: number
    today: number
  }
}

export async function GetVetData(): Promise<VetData> {
  const { data: clients } = await api.request({
    method: 'get',
    url: 'api/services/v2/length',
  })

  const { data: staff } = await api.request({
    method: 'get',
    url: 'api/staff/v2/length',
  })

  const { data: patients } = await api.request({
    method: 'get',
    url: 'api/patients/v2/length',
  })

  return {
    clients,
    patients,
    staff,
  }
}

export function useVetData() {
  return useQuery(['VetData'], GetVetData, {
    staleTime: 1000 * 60 * 60,
  })
}
