import { StaffReducedModel } from './StaffModel'
import { StaffModel } from 'domain/models/StaffModel'

export enum ReportTypes {
  PAYMENT = 'PAYMENT',
  REQUEST = 'REQUEST',
  REPORT = 'REPORT',
}

export type ReportModel = {
  id: number
  title: string
  description: string
  paymentValue: number
  type: ReportTypes
  createdAt: string
  approved: boolean
  createdBy: StaffReducedModel
  approver: StaffModel
}
