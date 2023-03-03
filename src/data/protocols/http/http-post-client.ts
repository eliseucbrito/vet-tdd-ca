import { HttpResponse } from './http-response'

// interface segregation principle S.O.L.I.D
export type HttpPostParams = {
  url: string
  body?: object
}

export interface HttpPostClient {
  post(params: HttpPostParams): Promise<HttpResponse>
}
