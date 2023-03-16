/* eslint-disable react/display-name */
import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputProps,
  Text,
} from '@chakra-ui/react'
import { forwardRef, ForwardRefRenderFunction, ReactNode } from 'react'

interface FloatingInputProps extends InputProps {
  label?: string
  children?: ReactNode
  errorMessage?: string
  error?: boolean
  name: string
}

const FloatingInputBase: ForwardRefRenderFunction<
  HTMLInputElement,
  FloatingInputProps
> = (
  { name, label, error, children, errorMessage = 'Campo inválido!', ...rest },
  ref,
) => {
  return (
    <FormControl>
      {!!label && <FormLabel htmlFor={name}>{label}</FormLabel>}

      {children ? (
        <InputGroup>
          <Input
            name={name}
            id={name}
            isInvalid={error}
            variant="flushed"
            px={2}
            _focus={{
              boxShadow: '0px 5px 10px 0px rgba(0, 0, 0, 0.5)',
              borderRadius: 8,
              border: 'none',
              transform: 'translateY(-2px)',
            }}
            ref={ref}
            {...rest}
          />

          {children}
        </InputGroup>
      ) : (
        <Input
          name={name}
          id={name}
          isInvalid={error}
          variant="flushed"
          px={2}
          _focus={{
            boxShadow: '0px 5px 10px 0px rgba(0, 0, 0, 0.5)',
            borderRadius: 8,
            border: 'none',
            transform: 'translateY(-2px)',
          }}
          ref={ref}
          {...rest}
        />
      )}
      {error && (
        <Text fontSize="sm" color="red">
          {errorMessage}
        </Text>
      )}
    </FormControl>
  )
}

export const FloatingInput = forwardRef(FloatingInputBase)
