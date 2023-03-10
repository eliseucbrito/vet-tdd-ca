import { RoleModel, Roles } from './RoleHistoricModel'

export type StaffModel = {
  id: number
  role: Roles
  fullName: string
  email: string
  avatarUrl: string
  createdAt: Date
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
  role: Roles
  avatarUrl: string
  onDuty: boolean
}
