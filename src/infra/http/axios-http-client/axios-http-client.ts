import axios, { AxiosError, AxiosHeaders, AxiosResponse } from 'axios'
import { HttpRequest } from 'data/protocols/http'
import {
  HttpClient,
  HttpResponse,
} from './../../../data/protocols/http/http-client'
import { parseCookies, setCookie } from 'nookies'

let isRefreshing = false
let failedRequestsQueue: {
  onSuccess: (token: string) => void
  onFailure: (err: AxiosError<unknown, any>) => void
}[] = []

const cookies = parseCookies()
export const api = axios.create({
  baseURL: 'http://localhost:80',
  headers: {
    Authorization: `Bearer ${cookies['vet.token']}`,
  },
})

api.interceptors.response.use(
  (response) => {
    return response
  },
  (error: AxiosError<{ message: string }>) => {
    if (error.response.status === 401) {
      if (error.response.data?.message === 'token.expired') {
        const originalConfig = error.config!

        if (!isRefreshing) {
          isRefreshing = true

          api
            .put('/auth/refresh', null, {
              headers: {
                Authorization: `Bearer ${cookies['vet.refreshToken']}`,
              },
            })
            .then((response) => {
              const { accessToken, refreshToken } = response.data

              setCookie(undefined, 'vet.token', accessToken, {
                maxAge: 60 * 60 * 24, // 24h
                path: '/',
              })

              setCookie(undefined, 'vet.refreshToken', refreshToken, {
                maxAge: 60 * 60 * 24, // 24h
                path: '/',
              })
              api.defaults.headers.Authorization = `Bearer ${accessToken}`

              failedRequestsQueue.forEach((request) =>
                request.onSuccess(accessToken),
              )
              failedRequestsQueue = []
            })
            .catch((err) => {
              failedRequestsQueue.forEach((request) => request.onFailure(err))
              failedRequestsQueue = []

              if (typeof window !== 'undefined') {
                // signOut()
              }
            })
            .finally(() => {
              isRefreshing = false
            })
        }

        return new Promise((resolve, reject) => {
          failedRequestsQueue.push({
            onSuccess: (token: string) => {
              ;(originalConfig.headers as AxiosHeaders).set(
                'Authorization',
                `Bearer ${token}`,
              )

              resolve(api(originalConfig!))
            },
            onFailure: (err: AxiosError) => {
              reject(err)
            },
          })
        })
      } else {
        // deslogar
      }

      return Promise.reject(error)
    } else {
      throw error
    }
  },
)

export class AxiosHttpClient implements HttpClient {
  async request<T = any>(data: HttpRequest): Promise<HttpResponse<T>> {
    const axiosResponse = await api.request({
      url: data.url,
      method: data.method,
      data: data.body,
      params: data.params,
      headers: data.headers,
    })
    return {
      statusCode: axiosResponse.status,
      body: axiosResponse.data,
    }
  }

  async authentication(data: HttpRequest): Promise<HttpResponse> {
    const axiosResponse = await api.request({
      url: data.url,
      method: data.method,
      data: data.body,
      headers: {
        Authorization: '',
      },
    })
    return {
      statusCode: axiosResponse.status,
      body: axiosResponse.data,
    }
  }
}
