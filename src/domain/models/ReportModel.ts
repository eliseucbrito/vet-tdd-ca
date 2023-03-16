import { StaffReduced } from './StaffModel'

export enum ReportTypes {
  PAYMENT,
  REQUEST,
  REPORT,
}

export type ReportModel = {
  id: number
  title: string
  description: string
  paymentValue: number
  type: ReportTypes
  createdAt: string
  approved: boolean
  staff: StaffReduced
  approvedBy: StaffReduced
}
