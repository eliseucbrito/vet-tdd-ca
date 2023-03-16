import { UserModel } from 'domain/models/UserModel'
import { createContext, ReactNode, useEffect, useState } from 'react'
import { SignIn } from 'presentation/protocols/SignIn'
import Router from 'next/router'
import { z } from 'zod'
import { useMutation } from 'react-query'
import { HttpResponse } from 'data/protocols/http'
import { AxiosError } from 'axios'
import { destroyCookie, parseCookies } from 'nookies'
import { AxiosHttpClient } from 'infra/http/axios-http-client/axios-http-client'
import { StaffReduced } from 'domain/models/StaffModel'

export const validationSchema = z.object({
  email: z.string().email({ message: 'Email invalido!' }),
  password: z
    .string()
    .min(6, { message: 'A senhora precisa ter no mínimo 6 caracteres!' }),
  rememberMe: z.boolean().default(false),
})

export type validationData = z.infer<typeof validationSchema>

type UserContextData = {
  user: UserModel | undefined
  loginError: HttpResponse<{ message: string }> | undefined
  handleSignIn: (data: validationData) => void
}

export const UserContext = createContext({} as UserContextData)

interface UserContextProps {
  children: ReactNode
}

export function SignOut() {
  destroyCookie(undefined, 'vet.token')
  destroyCookie(undefined, 'vet.refreshToken')
  Router.push('/login')
}

export function UserContextProvider({ children }: UserContextProps) {
  const [user, setUser] = useState<UserModel | undefined>()
  const [loginError, setLoginError] = useState<
    | HttpResponse<{
        message: string
      }>
    | undefined
  >()
  console.log(user, loginError)

  const axios = new AxiosHttpClient()

  useEffect(() => {
    const { 'vet.token': token } = parseCookies()

    if (token) {
      axios
        .request<StaffReduced>({
          url: '/api/staff/v1/me',
          method: 'get',
        })
        .then((response) => {
          setUser({
            ...response.body,
          })
        })
        .catch((error) => {
          console.log('GET /ME ERROR')

          return {
            statusCode: error.statusCode,
            body: error,
          }
        })
    }
  }, [])

  const signInMutation = useMutation(
    async (data: validationData) => {
      const response = await SignIn({
        email: data.email,
        password: data.password,
        rememberMe: false,
      }).then(() => {
        return axios
          .request<StaffReduced>({
            url: '/api/staff/v1/me',
            method: 'get',
          })
          .then((response) => {
            console.log('USER', response)
            return {
              statusCode: response.statusCode,
              body: response.body,
            }
          })
          .catch((error) => {
            console.log('GET /ME ERROR')

            throw error
          })
      })
      return response
    },
    {
      onSuccess: (data) => {
        console.log('LOGOU', data)
        setLoginError(undefined)
        Router.push('/dashboard')
      },
      onError: (error: AxiosError<{ message: string }>) => {
        console.log('USER SIGNIN MUTATION ERROR', error)
        setLoginError({
          statusCode: error.response.status,
          body: { message: error.response.data.message },
        })
      },
    },
  )

  async function handleSignIn(data: validationData) {
    signInMutation.mutateAsync(data)
  }

  return (
    <UserContext.Provider value={{ user, handleSignIn, loginError }}>
      {children}
    </UserContext.Provider>
  )
}
