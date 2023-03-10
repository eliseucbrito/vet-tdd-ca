import { ChakraProvider, Flex } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import { QueryClientProvider } from 'react-query'
import { defaultTheme } from 'presentation/styles/theme/defaultTheme'
import { queryClient } from 'presentation/services/react-query'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={defaultTheme}>
        <Flex w="100vw" h="100vh" overflow="auto">
          <Component {...pageProps} />
        </Flex>
      </ChakraProvider>
    </QueryClientProvider>
  )
}
