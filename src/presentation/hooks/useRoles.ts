import { RoleModel } from 'domain/models/RoleHistoricModel'
import { AxiosHttpClient } from 'infra/http/axios-http-client/axios-http-client'
import { useQuery } from 'react-query'

export async function GetRoles(): Promise<RoleModel[]> {
  const axios = new AxiosHttpClient(undefined)

  const { body: roles } = await axios.request<RoleModel[]>({
    method: 'get',
    url: '/api/roles/v2',
  })

  return roles
}

export function useRoles() {
  return useQuery(['roles'], GetRoles, {
    staleTime: 1000 * 60 * 60,
  })
}
