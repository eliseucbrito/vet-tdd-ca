/* eslint-disable react/display-name */
/* eslint-disable no-undef */
import { Input } from '@chakra-ui/react'
import { SearchContext } from 'presentation/context/SearchContext'
import { useContext, useState } from 'react'

export function PatientSearchBar() {
  const [searchingFor, setSearchingFor] = useState('')
  const { searchForPatient } = useContext(SearchContext)

  function handleSearchForPatient(search: string) {
    searchForPatient(search)
    setSearchingFor(search)
  }

  return (
    <Input
      w="min-content"
      borderRadius="100px"
      bg="white"
      placeholder="Pesquisar"
      marginBottom={2}
      value={searchingFor}
      onChange={(e) => {
        handleSearchForPatient(e.target.value)
      }}
    />
  )
}
