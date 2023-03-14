import { UserModel } from 'domain/models/UserModel'
import { createContext, ReactNode, useState } from 'react'
import { SignIn } from 'presentation/protocols/SignIn'
import Router from 'next/router'
import { z } from 'zod'
import { useMutation } from 'react-query'
import { HttpResponse } from 'data/protocols/http'
import { AxiosError } from 'axios'

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

export function UserContextProvider({ children }: UserContextProps) {
  const [user, setUser] = useState<UserModel | undefined>()
  const [loginError, setLoginError] = useState<
    | HttpResponse<{
        message: string
      }>
    | undefined
  >()

  console.log(user, loginError)

  const signInMutation = useMutation(
    async (data: validationData) => {
      const response = await SignIn({
        email: data.email,
        password: data.password,
        rememberMe: false,
      })
      return response
    },
    {
      onSuccess: (data) => {
        setUser({
          ...data.body,
        })

        setLoginError(undefined)

        Router.push('/dashboard')
      },
      onError: (error: AxiosError<{ message: string }>) => {
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
