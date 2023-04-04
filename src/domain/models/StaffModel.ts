import { RoleModel, Roles } from './RoleHistoricModel'
import { ServiceModel } from './ServiceModel'

export type StaffModel = {
  id: number
  role: {
    id: number
    description: Roles
    privileges: {
      id: number
      description: string
    }[]
  }
  fullName: string
  email: string
  avatarUrl: string
  createdAt: string
  cpf: string
  baseSalary: number
  onDuty: boolean
  weeklyWorkLoad: number
  workLoadCompleted: number
  roleHistoric: Array<RoleModel>
  servicesList: Array<ServiceModel>
}

export type StaffReducedModel = {
  id: number
  fullName: string
  role: {
    id: number
    description: Roles
    privileges: {
      id: number
      description: string
    }[]
  }
  avatarUrl: string
  onDuty: boolean
}
