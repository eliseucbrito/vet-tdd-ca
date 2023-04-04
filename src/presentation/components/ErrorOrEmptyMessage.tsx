import { Flex, Spinner, Text } from '@chakra-ui/react'

interface ErrorOrEmptyMessageProps {
  isError?: boolean
  IsLoading?: boolean
  isEmpty?: boolean
}

export function ErrorOrEmptyMessage({
  IsLoading,
  isEmpty,
  isError,
}: ErrorOrEmptyMessageProps) {
  return (
    <Flex w="100%" justify="center">
      {IsLoading ? (
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
