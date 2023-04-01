import { useQuery } from 'react-query'
import { ReportModel } from 'domain/models/ReportModel'
import { AxiosHttpClient } from 'infra/http/axios-http-client/axios-http-client'

export async function GetReports(): Promise<ReportModel[]> {
  const axios = new AxiosHttpClient(undefined)

  const { body: reports } = await axios.request<ReportModel[]>({
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
