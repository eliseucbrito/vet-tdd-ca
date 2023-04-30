import { CityModel } from './CityModel'
import { PatientReducedModel } from './PatientModel'
import { StaffReducedModel } from './StaffModel'

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
  createdAt: string
  serviceDate: string
  type: ServiceType
  status: ServiceStatus
  paymentStatus: PaymentStatus
  city: CityModel
  price: number
  medic: StaffReducedModel
  patient: PatientReducedModel
}
