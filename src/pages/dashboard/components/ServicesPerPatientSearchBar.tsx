/* eslint-disable react/no-children-prop */
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import { SearchContext } from 'presentation/context/SearchContext'
import { useContext, useState } from 'react'
import { FiSearch } from 'react-icons/fi'

export function ServicesPerPatientSearchBar() {
  const [searchingFor, setSearchingFor] = useState('')
  const { searchForServicePerPatient } = useContext(SearchContext)

  return (
    <InputGroup w="100%">
      <InputLeftElement children={<FiSearch />} />
      <Input
        borderRadius={12}
        bg="white"
        placeholder="Pesquisar"
        marginBottom={2}
        value={searchingFor}
        onChange={(e) => {
          searchForServicePerPatient(e.target.value)
          setSearchingFor(e.target.value)
        }}
      />
    </InputGroup>
  )
}
