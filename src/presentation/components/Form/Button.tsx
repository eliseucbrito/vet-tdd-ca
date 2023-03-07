import {
  Button as ChakraButton,
  ButtonProps as ChakraButtonProps,
} from '@chakra-ui/react'
import { ReactNode } from 'react'

interface ButtonProps extends ChakraButtonProps {
  children: ReactNode
}

export function Button({ children, ...props }: ButtonProps) {
  return (
    <ChakraButton bg="white" variant="unstyled" px={1} {...props}>
      {children}
    </ChakraButton>
  )
}
