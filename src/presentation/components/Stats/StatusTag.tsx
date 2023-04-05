import { Tag } from '@chakra-ui/react'

interface StatusTagProps {
  label: string
  color: string
}

export function StatusTag({ color, label }: StatusTagProps) {
  return (
    <Tag p={2} bg={color} fontWeight={600} color="gray.700">
      {label}
    </Tag>
  )
}
