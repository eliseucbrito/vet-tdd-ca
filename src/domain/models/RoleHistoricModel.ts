import { StaffModel, StaffReduced } from './StaffModel'

export enum Roles {
  CEO = 'CEO',
  GENERAL_MANAGER = 'GENERAL_MANAGER',
  MANAGER = 'MANAGER',
  VETERINARY = 'VETERINARY',
  ASSISTANT = 'ASSISTANT',
  INTERN = 'INTERN',
}

export type RoleModel = {
  id: number
  startedIn: string
  role: {
    id: number
    description: Roles
  }
  baseSalary: number
  weeklyWorkLoad: number
  promoter: StaffReduced
}
