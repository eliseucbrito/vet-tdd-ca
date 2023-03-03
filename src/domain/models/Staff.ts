export enum Roles {
  CEO,
  GENERAL_MANAGER,
  MANAGER,
  VETERINARY,
  ASSISTANT,
  INTERN,
}

export type Staff = {
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
  role_historic: Array<string>
  // TODO: SET ROLE HISTORIC
}
