import { useQuery, UseQueryOptions } from 'react-query'
import { AxiosHttpClient } from 'infra/http/axios-http-client/axios-http-client'
import { StaffModel } from 'domain/models/StaffModel'

export async function GetStaffDetails(id?: string): Promise<StaffModel> {
  const axios = new AxiosHttpClient(undefined)

  const { body: staff } = await axios.request<StaffModel>({
    method: 'get',
    url: `api/staff/v2/${id}/details`,
  })

  return staff
}

export async function GetStaff(): Promise<StaffModel[]> {
  const axios = new AxiosHttpClient(undefined)

  const { body: staff } = await axios.request<StaffModel[]>({
    method: 'get',
    url: 'api/staff/v2',
  })

  return staff
}

export function useStaffDetails(id?: string, options?: UseQueryOptions) {
  return useQuery(['staff', { id }], () => GetStaffDetails(id), {
    staleTime: 1000 * 60 * 60,
  })
}

export function useStaff(options?: UseQueryOptions) {
  return useQuery(['staff'], GetStaff, {
    staleTime: 1000 * 60 * 60,
  })
}
