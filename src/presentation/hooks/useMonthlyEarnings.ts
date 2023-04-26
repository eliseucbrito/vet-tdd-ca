import dayjs from 'dayjs'
import { ReportModel, ReportTypes } from 'domain/models/ReportModel'
import { ServiceModel } from 'domain/models/ServiceModel'
import { AxiosHttpClient } from 'infra/http/axios-http-client/axios-http-client'
import { useQuery } from 'react-query'

type IncomesPerTypeProps = {
  EXAM: number
  MEDICAL_CARE: number
  SURGERY: number
  EMERGENCY: number
}

type GetMonthlyEarningsType = {
  totalEarningsInLast30Days: number
  totalPaymentsInLast30Days: number
  incomesPerType: IncomesPerTypeProps
  firstServiceDate: Date
  lastServiceDate: Date
}

export async function GetMonthlyEarnings(): Promise<GetMonthlyEarningsType> {
  const isBetween = require('dayjs/plugin/isBetween')
  dayjs.extend(isBetween)

  const axios = new AxiosHttpClient(undefined)
  const { body: servicesData } = await axios.request<ServiceModel[]>({
    method: 'get',
    url: 'api/services/v2',
  })

  const { body: reportsData } = await axios.request<ReportModel[]>({
    method: 'get',
    url: 'api/reports/v2',
  })

  const oneMonthAgo = dayjs()
    .subtract(30, 'days')
    .set('hours', 0)
    .set('minutes', 0)
    .set('seconds', 0)
  const today = dayjs()

  const paymentsInLast30Days = reportsData.filter(
    (report) =>
      dayjs(report.createdAt).isBefore(today) &&
      dayjs(report.createdAt).isAfter(oneMonthAgo) &&
      report.approved &&
      report.type === ReportTypes.PAYMENT,
  )

  const servicesInLast30Days = servicesData.filter(
    (service) =>
      dayjs(service.serviceDate).isBefore(today) &&
      dayjs(service.serviceDate).isAfter(oneMonthAgo) &&
      service.status !== 'CANCELED' &&
      service.paymentStatus === 'PAID',
  )

  const incomesPerType: IncomesPerTypeProps = {
    EXAM: 0,
    MEDICAL_CARE: 0,
    SURGERY: 0,
    EMERGENCY: 0,
  }

  servicesInLast30Days.forEach((service) => {
    // if no exists, create with value 0
    if (incomesPerType[service.type] === undefined) {
      incomesPerType[service.type] = 0
    } else {
      incomesPerType[service.type] += service.price / 1000
    }
  })

  const earningsInitialValue = 0
  const totalEarningsInLast30Days = servicesInLast30Days.reduce(
    (accumulator, currentValue) => accumulator + currentValue.price / 1000,
    earningsInitialValue,
  )

  const paymentsInitialValue = 0
  const totalPaymentsInLast30Days = paymentsInLast30Days.reduce(
    (accumulator, currentValue) =>
      accumulator + currentValue.paymentValue / 1000,
    paymentsInitialValue,
  )

  const firstServiceDate = new Date(servicesInLast30Days[0].serviceDate)
  const lastServiceDate = new Date(
    servicesInLast30Days[servicesInLast30Days.length - 1].serviceDate,
  )

  return {
    firstServiceDate,
    incomesPerType,
    lastServiceDate,
    totalEarningsInLast30Days,
    totalPaymentsInLast30Days,
  }
}

export function useMonthlyEarnings() {
  return useQuery(['monthlyEarnings'], GetMonthlyEarnings, {
    staleTime: 1000 * 60 * 60,
  })
}
