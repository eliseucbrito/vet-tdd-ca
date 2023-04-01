import { PatientModel } from './PatientModel'
import { StaffModel } from './StaffModel'

export enum ServiceType {
  EXAM = 'EXAM',
  MEDICAL_CARE = 'MEDICAL_CARE',
  SURGERY = 'SURGERY',
  EMERGENCY = 'EMERGENCY',
}

export enum ServiceStatus {
  SCHEDULED = 'SCHEDULED',
  NOT_INITIALIZED = 'NOT_INITIALIZED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELED = 'CANCELED',
}

export enum PaymentStatus {
  WAITING_PAYMENT = 'WAITING_PAYMENT',
  PAID = 'PAID',
  CANCELED = 'CANCELED',
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
  medic: StaffModel
  patient: PatientModel
}
