import {
  api,
  AxiosHttpClient,
} from './../../infra/http/axios-http-client/axios-http-client'
import { setCookie } from 'nookies'
import { StaffModel, StaffReduced } from 'domain/models/StaffModel'
import { HttpResponse } from 'data/protocols/http'
import { AxiosResponse } from 'axios'

type credentialsProps = {
  email: string
  password: string
  rememberMe: boolean
}

export async function SignIn(
  credentials: credentialsProps,
): Promise<AxiosResponse> {
  const axios = new AxiosHttpClient()
  const url = '/auth/signin'
  const method = 'post'
  const body = {
    email: credentials.email,
    password: credentials.password,
  }

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
      api.defaults.headers.common.Authorization = `Bearer ${response.body.accessToken}`

      console.log('ACCESSS TOKEN ', response.body.accessToken)

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
    .catch((error) => {
      throw error
    })

  const user = await api.get<StaffModel>('/api/staff/v2/me', {
    headers: {
      Authorization: api.defaults.headers.common.Authorization,
    },
  })

  return user
}
