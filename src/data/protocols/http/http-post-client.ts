// interface segregation principle S.O.L.I.D
export interface HttpPostClient {
  post(url: string): Promise<void>
}
