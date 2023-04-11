import { PrivilegeModel } from './PrivilegeModel'
import { StaffReducedModel } from './StaffModel'

export type RoleModel = {
  id: number
  description: string
  privileges: PrivilegeModel[]
}

export type RoleHistoricModel = {
  id: number
  startedIn: string
  role: {
    id: number
    description: string
  }
  baseSalary: number
  weeklyWorkLoad: number
  promoter: StaffReducedModel
}
