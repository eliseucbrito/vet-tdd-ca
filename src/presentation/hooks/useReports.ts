import { useQuery, UseQueryOptions } from 'react-query'
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

export async function GetReportDetails(id: string): Promise<ReportModel> {
  const axios = new AxiosHttpClient(undefined)

  const { body: report } = await axios.request<ReportModel>({
    method: 'get',
    url: `api/reports/v2/${id}`,
  })

  return report
}

export function useReports(options?: UseQueryOptions) {
  return useQuery(['reports'], GetReports, {
    staleTime: 1000 * 60 * 60,
  })
}

export function useReportDetails(id: string, options?: UseQueryOptions) {
  return useQuery(['report', id], () => GetReportDetails(id), {
    staleTime: 1000 * 60 * 60,
  })
}
