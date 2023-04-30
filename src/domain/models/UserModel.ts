import { RoleModel } from './RoleHistoricModel'

export type UserModel = {
  id: number
  avatarUrl: string
  fullName: string
  onDuty: boolean
  role: RoleModel
}
