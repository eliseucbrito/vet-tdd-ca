import axios, { AxiosResponse } from 'axios'
import { HttpRequest } from 'data/protocols/http'
import {
  HttpClient,
  HttpResponse,
} from './../../../data/protocols/http/http-client'
import { AccountModel } from 'domain/models/AccountModel'
import { parseCookies } from 'nookies'

const cookies = parseCookies()
console.log('COOKIES ', cookies)
export const api = axios.create({
  baseURL: 'http://localhost:80',
  headers: {
    Authorization: `Bearer ${cookies['vet.token']}`,
  },
})

export class AxiosHttpClient implements HttpClient {
  async request<T = any>(data: HttpRequest): Promise<HttpResponse<T>> {
    let axiosResponse: AxiosResponse
    try {
      axiosResponse = await api.request({
        url: data.url,
        method: data.method,
        data: data.body,
        params: data.params,
        headers: data.headers,
      })
    } catch (error) {
      axiosResponse = error.response
    }
    return {
      statusCode: axiosResponse.status,
      body: axiosResponse.data,
    }
  }

  async authentication(data: HttpRequest): Promise<HttpResponse<AccountModel>> {
    let axiosResponse: AxiosResponse
    console.log('DATA AUTHENTICATION', data)
    try {
      axiosResponse = await api.request({
        url: data.url,
        method: data.method,
        data: data.body,
        headers: {
          Authorization: '',
        },
      })
    } catch (error) {
      axiosResponse = error.response
    }
    return {
      statusCode: axiosResponse.status,
      body: axiosResponse.data,
    }
  }
}
