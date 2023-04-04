import { AxiosHttpClient } from './../../infra/http/axios-http-client/axios-http-client'
import { setCookie } from 'nookies'
import { StaffModel } from 'domain/models/StaffModel'
import { HttpResponse } from 'data/protocols/http'
import { AxiosResponse } from 'axios'

type credentialsProps = {
  email: string
  password: string
  rememberMe: boolean
}

export async function SignIn(
  credentials: credentialsProps,
): Promise<HttpResponse> {
  const axios = new AxiosHttpClient(undefined)
  const url = '/auth/signin'
  const method = 'post'
  const body = {
    email: credentials.email,
    password: credentials.password,
  }

  let token

  const maxAgeValue = credentials.rememberMe ? 60 * 60 * 24 * 30 : 60 * 60 * 24

  await axios
    .authentication({
      url,
      method,
      body,
      headers: {
        Authorization: '',
      },
    })
    .then((response) => {
      token = response.body.accessToken

      setCookie(undefined, 'vet.token', response.body.accessToken, {
        maxAge: maxAgeValue,
        path: '/',
        httpOnly: false,
      })

      setCookie(undefined, 'vet.refreshToken', response.body.refreshToken, {
        maxAge: maxAgeValue,
        path: '/',
        httpOnly: false,
      })
    })

  const user = await axios.request<StaffModel>({
    method: 'get',
    url: '/api/staff/v2/me',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return user
}
