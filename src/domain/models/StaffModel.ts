import { RoleModel, Roles } from './RoleHistoricModel'

export type StaffModel = {
  id: number
  role: {
    id: number
    description: Roles
    authority: Roles
  }
  fullName: string
  email: string
  avatarUrl: string
  createdAt: string
  cpf: number
  baseSalary: number
  onDuty: boolean
  weeklyWorkLoad: number
  workLoadCompleted: number
  role_historic: Array<RoleModel>
  // TODO: SET ROLE HISTORIC
}

export type StaffReduced = {
  id: number
  fullName: string
  role: {
    id: number
    description: Roles
    authority: Roles
  }
  avatarUrl: string
  onDuty: boolean
}
