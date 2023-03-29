import { PatientModel } from './PatientModel'
import { StaffModel } from './StaffModel'

export enum ServiceType {
  EXAM,
  MEDICAL_CARE,
  HOME_CARE,
  SURGERY,
  EMERGENCY,
}

export enum ServiceStatus {
  SCHEDULED,
  NOT_INITIALIZED,
  IN_PROGRESS,
  COMPLETED,
  CANCELED,
}

export enum PaymentStatus {
  WAITING_PAYMENT,
  PAID,
  CANCELED,
}

export type ServiceModel = {
  id: number
  reason: string
  description: string
  createdAt: Date
  serviceDate: Date
  type: ServiceType
  status: ServiceStatus
  paymentStatus: PaymentStatus
  city: {
    id: number
    name: string
  }
  price: number
  staff: StaffModel
  patient: PatientModel
}
