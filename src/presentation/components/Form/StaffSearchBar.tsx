/* eslint-disable react/display-name */
/* eslint-disable no-undef */
import { Input } from '@chakra-ui/react'
import { SearchContext } from 'presentation/context/SearchContext'
import { useContext, useState } from 'react'

export function StaffSearchBar() {
  const [searchingFor, setSearchingFor] = useState('')
  const { searchInAllStaff } = useContext(SearchContext)

  return (
    <Input
      w="min-content"
      borderRadius="100px"
      bg="white"
      placeholder="Pesquisar"
      marginBottom={2}
      value={searchingFor}
      onChange={(e) => {
        searchInAllStaff(e.target.value)
        setSearchingFor(e.target.value)
      }}
    />
  )
}
