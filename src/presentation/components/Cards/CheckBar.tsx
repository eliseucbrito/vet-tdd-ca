import { Box, Flex, VStack } from '@chakra-ui/react'

interface CheckBarProps {
  completed: boolean
}

export function CheckBar({ completed }: CheckBarProps) {
  return (
    <VStack h="100%" bg="blue" justify="center" w="0.25rem">
      <Box
        display="flex"
        bg={completed ? 'blue' : 'green.600'}
        borderRadius={'full'}
        p={1}
        _before={{
          content: '""',
          width: '0.5rem',
          height: '0.5rem',
          backgroundColor: 'white',
          borderRadius: '100%',
        }}
      />
    </VStack>
  )
}
