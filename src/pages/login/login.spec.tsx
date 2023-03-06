import React from 'react'
import { render, RenderResult, screen } from '@testing-library/react'
import { ChakraProvider } from '@chakra-ui/react'
import { defaultTheme } from '../../presentation/styles/theme/defaultTheme'
import Login from './index'
import '../../presentation/tests/mock-match-media'

type SutTypes = {
  sut: RenderResult
}

const makeSut = (): SutTypes => {
  const sut = render(
    <ChakraProvider theme={defaultTheme}>
      <Login />
    </ChakraProvider>,
  )

  return {
    sut,
  }
}

describe('Login component', () => {
  test('', () => {
    const sut = makeSut()
  })
})
