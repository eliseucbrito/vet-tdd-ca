import { useQuery, UseQueryOptions } from 'react-query'
import {
  PaymentStatus,
  ServiceModel,
  ServiceType,
} from 'domain/models/ServiceModel'
import { AxiosHttpClient } from 'infra/http/axios-http-client/axios-http-client'
import dayjs from 'dayjs'
import { ReportModel } from 'domain/models/ReportModel'

type DailyIncomes = {
  exams: number
  medicalCare: number
  surgerys: number
  emergencys: number
}

type DayEarnings = {
  incomes: number[]
  outcomes: number[]
  earnings: number[]
  dailyIncomes: DailyIncomes
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

  const weeklyEarnings = [
    { weekDay: 0, incomes: 0, outcomes: 0, earnings: 0 },
    { weekDay: 1, incomes: 0, outcomes: 0, earnings: 0 },
    { weekDay: 2, incomes: 0, outcomes: 0, earnings: 0 },
    { weekDay: 3, incomes: 0, outcomes: 0, earnings: 0 },
    { weekDay: 4, incomes: 0, outcomes: 0, earnings: 0 },
    { weekDay: 5, incomes: 0, outcomes: 0, earnings: 0 },
    { weekDay: 6, incomes: 0, outcomes: 0, earnings: 0 },
  ]

  const dailyIncomes: DailyIncomes = {
    exams: 0,
    medicalCare: 0,
    surgerys: 0,
    emergencys: 0,
  }

  servicesData.forEach((service) => {
    if (service.paymentStatus.toString() !== 'PAID') {
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
    const isToday =
      serviceDate.format('DD/MM/YYYY') === today.format('DD/MM/YYYY')

    if (isToday) {
      switch (service.type) {
        case 'EXAM': {
          dailyIncomes.exams += service.price
          break
        }
        case 'MEDICAL_CARE': {
          dailyIncomes.medicalCare += service.price
          break
        }
        case 'SURGERY': {
          dailyIncomes.surgerys += service.price
          break
        }
        case 'EMERGENCY': {
          dailyIncomes.emergencys += service.price
          break
        }
      }
    }

    if (serviceDate >= oneWeekAgo && serviceDate <= today) {
      const daysAgo = serviceDate.diff(oneWeekAgo, 'days')

      weeklyEarnings[daysAgo].incomes += service.price / 1000
      weeklyEarnings[daysAgo].earnings += service.price / 1000
    }
  })

  reportsData.forEach((report) => {
    if (!report.approved) {
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

      weeklyEarnings[daysAgo].outcomes += report.paymentValue / 1000
      weeklyEarnings[daysAgo].earnings -= report.paymentValue / 1000
    }
  })

  const DaysIncomes = [0, 0, 0, 0, 0, 0, 0]
  const DaysOutcomes = [0, 0, 0, 0, 0, 0, 0]
  const DaysEarnings = [0, 0, 0, 0, 0, 0, 0]

  weeklyEarnings.forEach((day, index) => {
    DaysIncomes[index] = day.incomes
    DaysOutcomes[index] = day.outcomes
    DaysEarnings[index] = day.earnings
  })

  console.log('DAILY INCOMES ', dailyIncomes)

  return {
    earnings: DaysEarnings,
    incomes: DaysIncomes,
    outcomes: DaysOutcomes,
    dailyIncomes,
  }
}

export function useWeeklyEarnings(options?: UseQueryOptions) {
  return useQuery(['weeklyEarnings'], GetWeeklyEarnings, {
    staleTime: 1000 * 60 * 60,
  })
}
