import { HttpResponse } from './http-response'

// interface segregation principle S.O.L.I.D
export type HttpPostParams<T> = {
  url: string
  body?: T
}

export interface HttpPostClient<T, R> {
  post(params: HttpPostParams<T>): Promise<HttpResponse<R>>
}
