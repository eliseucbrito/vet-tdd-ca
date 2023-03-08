import { ChakraProvider, Flex } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import { defaultTheme } from 'presentation/styles/theme/defaultTheme'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={defaultTheme}>
      <Flex w="100vw" h="100vh" overflow="auto">
        <Component {...pageProps} />
      </Flex>
    </ChakraProvider>
  )
}
