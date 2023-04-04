import { Roles } from './RoleHistoricModel'

export type UserModel = {
  id: number
  avatarUrl: string
  fullName: string
  onDuty: boolean
  role: {
    id: number
    description: Roles
    privileges: {
      id: number
      description: string
    }[]
  }
}
