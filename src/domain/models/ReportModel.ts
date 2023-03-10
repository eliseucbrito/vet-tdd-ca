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
  createdAt: Date
  approved: boolean
  staff: StaffReduced
  approvedBy: StaffReduced
}
