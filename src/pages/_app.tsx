import { ChakraProvider, Flex } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import { QueryClientProvider } from 'react-query'
import { defaultTheme } from 'presentation/styles/theme/defaultTheme'
import { queryClient } from 'presentation/services/react-query'
import { useRouter } from 'next/router'
import { Sidebar } from 'presentation/components/Sidebar/Sidebar'
import { UserContextProvider } from 'presentation/context/UserContext'

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const isLoginPage = router.asPath === '/login'
  const isValidPage = router.asPath === ('/dashboard' || '/staff')
  console.log(isLoginPage, router.asPath, isValidPage)

  return (
    <QueryClientProvider client={queryClient}>
      <UserContextProvider>
        <ChakraProvider theme={defaultTheme}>
          <Flex w="100vw" h="100vh" overflow="auto">
            {!isLoginPage && <Sidebar />}
            <Flex w="100%" h="100%" overflow="auto">
              <Component {...pageProps} />
            </Flex>
          </Flex>
        </ChakraProvider>
      </UserContextProvider>
    </QueryClientProvider>
  )
}
