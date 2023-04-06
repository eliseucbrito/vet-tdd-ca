import { ChakraProvider, Flex } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import { Hydrate, QueryClientProvider } from 'react-query'
import { defaultTheme } from 'presentation/styles/theme/defaultTheme'
import { queryClient } from 'infra/cache/react-query'
import { useRouter } from 'next/router'
import { Sidebar } from 'presentation/components/Sidebar/Sidebar'
import { UserContextProvider } from 'presentation/context/UserContext'
import IntlProvider from 'react-intl/src/components/provider'

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const isLoginPage = router.asPath === '/login'
  const isValidPage = router.asPath === ('/dashboard' || '/staff')

  return (
    <QueryClientProvider client={queryClient}>
      <UserContextProvider>
        <ChakraProvider theme={defaultTheme}>
          <IntlProvider locale="br">
            <Hydrate state={pageProps.dehydratedState}>
              <Flex w="100vw" h="100vh" overflow="auto">
                {!isLoginPage && <Sidebar />}
                <Flex w="100%" h="100%" overflow="auto">
                  <Component {...pageProps} />
                </Flex>
              </Flex>
            </Hydrate>
          </IntlProvider>
        </ChakraProvider>
      </UserContextProvider>
    </QueryClientProvider>
  )
}
