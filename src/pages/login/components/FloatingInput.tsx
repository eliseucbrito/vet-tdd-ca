import { Input, InputProps } from '@chakra-ui/react'

export function FloatingInput({ ...InputProps }: InputProps) {
  return (
    <Input
      type="text"
      variant="flushed"
      px={2}
      borderRadius={8}
      _focus={{
        'box-shadow': '0px 5px 10px 0px rgba(0, 0, 0, 0.5)',
        borderRadius: 8,
        border: 'none',
        transform: 'translateY(-3px)',
      }}
      bg={['none', 'white']}
      {...InputProps}
    />
  )
}
