import axios, { AxiosError, AxiosHeaders, AxiosResponse } from 'axios'
import { HttpRequest } from 'data/protocols/http'
import {
  HttpClient,
  HttpResponse,
} from './../../../data/protocols/http/http-client'
import { parseCookies, setCookie } from 'nookies'

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
        console.log('FAZENDO REFRESH')

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

            console.log('REFRESH FEITO')
            api.defaults.headers.Authorization = `Bearer ${accessToken}`
          })
      } else {
        // deslogar
      }
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
