import { ReactNode } from 'react'
import { VStack } from '@chakra-ui/react'

interface CardDetailBlockProps {
  children: ReactNode
  last?: boolean
}

export function CardDetailBlock({ children, last }: CardDetailBlockProps) {
  return (
    <VStack
      align="center"
      h="100%"
      py={2}
      px={4}
      borderRight={last ? 'none' : '1px solid #A0A1A3'}
    >
      {children}
    </VStack>
  )
}
