export enum HttpStatusCode {
  ok = 200,
  noContent = 204,
  badRequest = 400,
  unauthorized = 401,
  notFound = 404,
  serverError = 500,
}

export type HttpMethod = 'post' | 'get' | 'put' | 'delete' | 'patch'

export type HttpPostParams<T> = {
  url: string
  method: HttpMethod
  body?: T
  authorization?: string
}

export type HttpResponse<T> = {
  statusCode: number
  body?: T
}

export interface HttpPostClient<T, R> {
  post(params: HttpPostParams<T>): Promise<HttpResponse<R>>
}

export type HttpRequest = {
  url: string
  method: HttpMethod
  body?: any
  headers?: any
}

export interface HttpClient<R = any> {
  request: (data: HttpRequest) => Promise<HttpResponse<R>>
}
