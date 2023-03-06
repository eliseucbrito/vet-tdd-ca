import React from 'react'
import { render } from '@testing-library/react'
import { ChakraProvider } from '@chakra-ui/react'
import { defaultTheme } from '../../presentation/styles/theme/defaultTheme'
import Login from './index'
import '../../presentation/tests/mock-match-media'

describe('', () => {
  test('', () => {
    render(
      <ChakraProvider theme={defaultTheme}>
        <Login />
      </ChakraProvider>,
    )
  })
})
