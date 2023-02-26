export type AccountModel = {
  username: string
  authenticated: boolean
  accessToken: string
  refreshToken: string
  created: Date
  expiration: Date
}
