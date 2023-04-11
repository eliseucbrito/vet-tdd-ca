import { RoleHistoricModel } from './RoleHistoricModel'
import { ServiceModel } from './ServiceModel'

export type StaffModel = {
  id: number
  role: {
    id: number
    description: string
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
  roleHistoric: Array<RoleHistoricModel>
  servicesList: Array<ServiceModel>
}

export type StaffReducedModel = {
  id: number
  fullName: string
  role: {
    id: number
    description: string
    privileges: {
      id: number
      description: string
    }[]
  }
  avatarUrl: string
  onDuty: boolean
}
