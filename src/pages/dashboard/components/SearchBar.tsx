/* eslint-disable react/no-children-prop */
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import { FiSearch } from 'react-icons/fi'

export function SearchBar() {
  return (
    <InputGroup w="100%">
      <InputLeftElement children={<FiSearch />} />
      <Input bg="white" placeholder="Pesquisar por paciente" />
    </InputGroup>
  )
}
