import { useQuery, UseQueryOptions } from 'react-query'
import { PaymentStatus, ServiceModel } from 'domain/models/ServiceModel'
import { AxiosHttpClient } from 'infra/http/axios-http-client/axios-http-client'
import dayjs from 'dayjs'
import { ReportModel } from 'domain/models/ReportModel'

type DayEarnings = {
  incomes: number[]
  outcomes: number[]
  earnings: number[]
}

export async function GetWeeklyEarnings(): Promise<DayEarnings> {
  const axios = new AxiosHttpClient(undefined)
  const { body: servicesData } = await axios.request<ServiceModel[]>({
    method: 'get',
    url: 'api/services/v2',
  })

  const { body: reportsData } = await axios.request<ReportModel[]>({
    method: 'get',
    url: 'api/reports/v2',
  })

  console.log('SERVICES DATA', servicesData)

  const weeklyEarnings = [
    { weekDay: 0, incomes: 0, outcomes: 0, earnings: 0 },
    { weekDay: 1, incomes: 0, outcomes: 0, earnings: 0 },
    { weekDay: 2, incomes: 0, outcomes: 0, earnings: 0 },
    { weekDay: 3, incomes: 0, outcomes: 0, earnings: 0 },
    { weekDay: 4, incomes: 0, outcomes: 0, earnings: 0 },
    { weekDay: 5, incomes: 0, outcomes: 0, earnings: 0 },
    { weekDay: 6, incomes: 0, outcomes: 0, earnings: 0 },
  ]

  servicesData.forEach((service) => {
    if (service.paymentStatus.toString() !== 'PAID') {
      console.log('RETURNING ' + service.id, service.paymentStatus)
      return
    }

    const serviceDate = dayjs(service.serviceDate)
    const oneWeekAgo = dayjs(new Date())
      .subtract(6, 'day')
      .set('hours', 0)
      .set('minutes', 0)
      .set('seconds', 0)
      .set('milliseconds', 0)
    const today = dayjs(new Date())

    if (serviceDate >= oneWeekAgo && serviceDate <= today) {
      const daysAgo = serviceDate.diff(oneWeekAgo, 'days')
      console.log('ADDING ', service.id, daysAgo)

      weeklyEarnings[daysAgo].incomes += service.price / 1000
      weeklyEarnings[daysAgo].earnings += service.price / 1000
    }
  })

  reportsData.forEach((report) => {
    if (!report.approved) {
      console.log('RETURNING ' + report.id)
      return
    }

    const reportDate = dayjs(report.createdAt)
    const oneWeekAgo = dayjs(new Date())
      .subtract(6, 'day')
      .set('hours', 0)
      .set('minutes', 0)
      .set('seconds', 0)
      .set('milliseconds', 0)
    const today = dayjs(new Date())

    if (reportDate >= oneWeekAgo && reportDate <= today) {
      const daysAgo = reportDate.diff(oneWeekAgo, 'days')
      console.log('ADDING ', report.id, daysAgo)

      weeklyEarnings[daysAgo].outcomes += report.paymentValue / 1000
      weeklyEarnings[daysAgo].earnings -= report.paymentValue / 1000
    }
  })

  console.log('WEEKLY EARNINGS ', weeklyEarnings)

  const DaysIncomes = [0, 0, 0, 0, 0, 0, 0]
  const DaysOutcomes = [0, 0, 0, 0, 0, 0, 0]
  const DaysEarnings = [0, 0, 0, 0, 0, 0, 0]

  weeklyEarnings.forEach((day, index) => {
    DaysIncomes[index] = day.incomes
    DaysOutcomes[index] = day.outcomes
    DaysEarnings[index] = day.earnings
  })

  console.log('RETORNANDO ', DaysEarnings, DaysIncomes, DaysOutcomes)

  return {
    earnings: DaysEarnings,
    incomes: DaysIncomes,
    outcomes: DaysOutcomes,
  }
}

export function useWeeklyEarnings(options?: UseQueryOptions) {
  return useQuery(['weeklyEarnings'], GetWeeklyEarnings, {
    staleTime: 1000 * 60 * 60,

  })
}
