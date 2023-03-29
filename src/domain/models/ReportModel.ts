import { StaffReduced } from './StaffModel'
import { StaffModel } from 'domain/models/StaffModel'

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
  staff: StaffModel
  approver: StaffModel
}
