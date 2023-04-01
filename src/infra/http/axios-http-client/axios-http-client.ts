import { HttpRequest } from 'data/protocols/http'
import {
  HttpClient,
  HttpResponse,
} from './../../../data/protocols/http/http-client'
import { parseCookies, setCookie } from 'nookies'
import axios, { AxiosError, AxiosHeaders, AxiosInstance } from 'axios'
import { SignOut } from 'presentation/context/UserContext'
import { GetServerSidePropsContext } from 'next'

let isRefreshing = false
let failedRequestsQueue: {
  onSuccess: (token: string) => void
  onFailure: (err: AxiosError<unknown, any>) => void
}[] = []

export class AxiosHttpClient implements HttpClient {
  private cookies: {
    [key: string]: string
  }

  private api: AxiosInstance

  constructor(ctx: GetServerSidePropsContext | undefined) {
    this.cookies = parseCookies(ctx)
    this.api = axios.create({
      baseURL: 'http://localhost:80',
      headers: {
        Authorization: `Bearer ${this.cookies['vet.token']}`,
      },
    })

    this.api.interceptors.response.use(
      (response) => {
        const cookies = parseCookies()
        console.log('COOKIES IN RESPONSE', cookies)
        return response
      },
      (error: AxiosError<{ message: string }>) => {
        if (error.response.status === 401) {
          if (error.response.data.message === 'token.expired') {
            const originalConfig = error.config!

            console.log(
              'ERRO DE TOKEN EXPIRED ',
              this.cookies['vet.refreshToken'],
            )

            if (!isRefreshing) {
              isRefreshing = true

              this.refresh(`Bearer ${this.cookies['vet.refreshToken']}`)
                .then((response) => {
                  const { accessToken, refreshToken } = response.body

                  setCookie(undefined, 'vet.token', accessToken, {
                    maxAge: 60 * 60 * 24, // 24h
                    path: '/',
                  })

                  setCookie(undefined, 'vet.refreshToken', refreshToken, {
                    maxAge: 60 * 60 * 24, // 24h
                    path: '/',
                  })

                  console.log('NEW ACCESS TOKEN ', accessToken)

                  this.api.defaults.headers.Authorization = `Bearer ${accessToken}`
                  console.log(
                    'ACCESS TOKEN SETTED ',
                    this.api.defaults.headers.Authorization,
                  )
                  failedRequestsQueue.forEach((request) =>
                    request.onSuccess(accessToken),
                  )
                  failedRequestsQueue = []
                })
                .catch((err) => {
                  failedRequestsQueue.forEach((request) =>
                    request.onFailure(err),
                  )
                  failedRequestsQueue = []

                  if (typeof window !== 'undefined') {
                    SignOut()
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

                  resolve(this.api(originalConfig!))
                },
                onFailure: (err: AxiosError) => {
                  reject(err)
                },
              })
            })
          }

          return Promise.reject(error)
        } else {
          throw error
        }
      },
    )
  }

  async request<T = any>(data: HttpRequest): Promise<HttpResponse<T>> {
    const axiosResponse = await this.api.request({
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
    const axiosResponse = await this.api.request({
      url: data.url,
      method: data.method,
      data: data.body,
      headers: {
        Authorization: '',
      },
    })
    console.log('NOVO TOKEN NO AUTHENTICATION ', axiosResponse.data.accessToken)

    this.api.defaults.headers.common.Authorization = `Bearer ${axiosResponse.data.accessToken}`

    console.log(
      'TOKEN SETADO NO AUTHENTICATION ',
      this.api.defaults.headers.common.Authorization,
    )

    return {
      statusCode: axiosResponse.status,
      body: axiosResponse.data,
    }
  }

  async refresh(
    Authorization: string,
  ): Promise<HttpResponse<{ accessToken: string; refreshToken: string }>> {
    const axiosResponse = await this.api.request({
      url: '/auth/refresh',
      method: 'put',
      headers: {
        Authorization,
      },
    })
    return {
      statusCode: axiosResponse.status,
      body: axiosResponse.data,
    }
  }

  getAccessToken() {
    return this.cookies['vet.token']
  }
}

// api.interceptors.response.use(
//   (response) => {
//     const cookies = parseCookies()
//     console.log('COOKIES IN RESPONSE', cookies)
//     return response
//   },
//   (error: AxiosError<{ message: string }>) => {
//     if (error.response.status === 401) {
//       if (error.response.data.message === 'token.expired') {
//         cookies = parseCookies()
//         const axiosApi = new AxiosHttpClient(undefined)
//         const originalConfig = error.config!

//         console.log('ERRO DE TOKEN EXPIRED ')

//         if (!isRefreshing) {
//           isRefreshing = true

//           axiosApi
//             .refresh(`Bearer ${cookies['vet.refreshToken']}`)
//             .then((response) => {
//               const { accessToken, refreshToken } = response.body

//               setCookie(undefined, 'vet.token', accessToken, {
//                 maxAge: 60 * 60 * 24, // 24h
//                 path: '/',
//               })

//               setCookie(undefined, 'vet.refreshToken', refreshToken, {
//                 maxAge: 60 * 60 * 24, // 24h
//                 path: '/',
//               })

//               api.defaults.headers.Authorization = `Bearer ${accessToken}`
//               failedRequestsQueue.forEach((request) =>
//                 request.onSuccess(accessToken),
//               )
//               failedRequestsQueue = []
//             })
//             .catch((err) => {
//               failedRequestsQueue.forEach((request) => request.onFailure(err))
//               failedRequestsQueue = []

//               if (typeof window !== 'undefined') {
//                 SignOut()
//               }
//             })
//             .finally(() => {
//               isRefreshing = false
//             })
//         }

//         return new Promise((resolve, reject) => {
//           failedRequestsQueue.push({
//             onSuccess: (token: string) => {
//               ;(originalConfig.headers as AxiosHeaders).set(
//                 'Authorization',
//                 `Bearer ${token}`,
//               )

//               resolve(api(originalConfig!))
//             },
//             onFailure: (err: AxiosError) => {
//               reject(err)
//             },
//           })
//         })
//       }

//       return Promise.reject(error)
//     } else {
//       throw error
//     }
//   },
// )
