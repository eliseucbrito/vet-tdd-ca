/* eslint-disable react/display-name */
import { Button, ButtonProps } from '@chakra-ui/react'
import { forwardRef, ReactNode } from 'react'

interface SearchResultButtonProps extends ButtonProps {
  children: ReactNode
}

export const SearchResultButton = forwardRef<
  HTMLInputElement,
  SearchResultButtonProps
>(({ children, ...buttonProps }: SearchResultButtonProps, ref) => {
  return (
    <Button
      variant="unstyled"
      _hover={{ bg: 'gray.100' }}
      borderRadius={6}
      ref={ref}
      {...buttonProps}
    >
      {children}
    </Button>
  )
})
