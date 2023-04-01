import { api } from 'infra/http/axios-http-client/axios-http-client'
import { useQuery } from 'react-query'
import { ReportModel } from 'domain/models/ReportModel'

export async function GetReports(): Promise<ReportModel[]> {
  const { data: reports } = await api.request<ReportModel[]>({
    method: 'get',
    url: 'api/reports/v2',
  })

  return reports
}

export function useReports() {
  return useQuery(['reports'], GetReports, {
    staleTime: 1000 * 60 * 60,
  })
}
