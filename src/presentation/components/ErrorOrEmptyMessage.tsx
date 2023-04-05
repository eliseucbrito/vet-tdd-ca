import { Flex, Spinner, Text } from '@chakra-ui/react'

interface ErrorOrEmptyMessageProps {
  isError?: boolean
  isLoading?: boolean
  isEmpty?: boolean
}

export function ErrorOrEmptyMessage({
  isLoading,
  isEmpty,
  isError,
}: ErrorOrEmptyMessageProps) {
  return (
    <Flex w="100%" justify="center">
      {isLoading ? (
        <Spinner />
      ) : isError ? (
        <Text>Ocorreu um erro, tente novamente.</Text>
      ) : isEmpty ? (
        <Text>Nenhum resultado encontrado.</Text>
      ) : (
        <Text>?????</Text>
      )}
    </Flex>
  )
}
