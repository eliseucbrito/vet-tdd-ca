// interface segregation principle S.O.L.I.D
export type HttpPostParams = {
  url: string
}

export interface HttpPostClient {
  post(params: HttpPostParams): Promise<void>
}
