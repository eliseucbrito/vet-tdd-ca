import { RoleHistoricModel, RoleModel } from './RoleHistoricModel'
import { ServiceModel } from './ServiceModel'

export type StaffModel = {
  id: number
  role: RoleModel
  fullName: string
  email: string
  avatarUrl: string
  createdAt: string
  cpf: string
  baseSalary: number
  onDuty: boolean
  weeklyWorkLoad: number
  workLoadCompleted: number
  roleHistoric: Array<RoleHistoricModel>
  servicesList: Array<ServiceModel>
}

export type StaffReducedModel = {
  id: number
  fullName: string
  role: RoleModel
  avatarUrl: string
  onDuty: boolean
}
