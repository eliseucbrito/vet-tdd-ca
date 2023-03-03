import { StaffModel } from './StaffModel'

export enum Roles {
  CEO,
  GENERAL_MANAGER,
  MANAGER,
  VETERINARY,
  ASSISTANT,
  INTERN,
}

export type RoleModel = {
  startedIn: Date
  role: Roles
  baseSalary: number
  weeklyWorkLoad: number
  promoter: StaffModel
}
