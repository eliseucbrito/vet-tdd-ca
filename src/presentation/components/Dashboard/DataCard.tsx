import {
  Flex,
  HStack,
  Image as ChakraImage,
  Text,
  VStack,
} from '@chakra-ui/react'
import Image from 'next/image'
import chart from '../../../presentation/Assets/chart.svg'

import { ReactNode } from 'react'

interface DataCardProps {
  label: string
  total: number
  sublabel: string
  subtotal: number
  image: ReactNode
}

export function DataCard({
  image,
  label,
  sublabel,
  subtotal,
  total,
}: DataCardProps) {
  return (
    <Flex
      w="30%"
      align="center"
      justify="space-between"
      bg="white"
      p={3}
      borderRadius={12}
    >
      <HStack>
        {image}
        <VStack align="flex-start" ml={2} mr={6}>
          <Text color="gray.200" fontSize="xs">
            {label}
          </Text>
          <Text fontWeight={600} fontSize="xl">
            {total}
          </Text>
        </VStack>
      </HStack>
      <VStack justify="space-between" align="center">
        <ChakraImage as={Image} src={chart} />
        <Text
          color="gray.200"
          fontSize="xs"
          sx={{
            span: {
              color: 'green.600',
            },
          }}
        >
          {sublabel}: <span>{subtotal}</span>
        </Text>
      </VStack>
    </Flex>
  )
}
