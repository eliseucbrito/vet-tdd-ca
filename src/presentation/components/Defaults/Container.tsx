import { Flex, FlexProps } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface ContainerProps extends FlexProps {
  children: ReactNode
}

export function Container({ children, ...rest }: ContainerProps) {
  return (
    <Flex w="100%" h="100%" p={['0 1rem', '1rem 1rem 1rem 1.5rem']} {...rest}>
      {children}
    </Flex>
  )
}
