/* eslint-disable react/display-name */
/* eslint-disable no-undef */
import {
  Popover,
  PopoverTrigger,
  Input,
  PopoverContent,
  PopoverBody,
  Button,
  PopoverArrow,
  PopoverHeader,
} from '@chakra-ui/react'
import { SearchContext } from 'presentation/context/SearchContext'
import { forwardRef, useContext, useEffect, useState } from 'react'
import { ChangeHandler } from 'react-hook-form'
import { SearchResultButton } from './SearchResultButton'

interface SearchInputProps {
  isOpen: boolean
  isError: boolean
  // PROPS FOR USE {...register}
  name: string
  onBlur: ChangeHandler
  onChange: ChangeHandler
  clearValue?: boolean
}

export const StaffSearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  (
    { isError, isOpen, name, onBlur, onChange, clearValue }: SearchInputProps,
    ref,
  ) => {
    const [staffSelected, setStaffSelected] = useState('')
    const [searchingFor, setSearchingFor] = useState('')
    const [selectOne, setSelectOne] = useState(false)
    const { searchForAStaffForService, staffsFounded } =
      useContext(SearchContext)

    function handleSearchForStaff(search: string) {
      searchForAStaffForService(search)
      setSearchingFor(search)
    }

    useEffect(() => {
      if (clearValue) setStaffSelected('')
      setSelectOne(false)
      setSearchingFor('')
    }, [clearValue])

    const hasOneSelected = selectOne && staffSelected !== ''

    return (
      <Popover
        autoFocus={false}
        isOpen={
          staffsFounded?.length > 0 &&
          isOpen &&
          !hasOneSelected &&
          searchingFor !== ''
        }
        closeOnBlur={true}
        onClose={() => handleSearchForStaff('')}
      >
        <PopoverTrigger>
          <Input
            w="100%"
            placeholder="Médico"
            isInvalid={isError}
            marginBottom={2}
            value={staffSelected}
            onChange={(e) => {
              handleSearchForStaff(e.target.value)
              setStaffSelected(e.target.value)

              if (e.target.value !== staffSelected) {
                setSelectOne(false)
              }
            }}
          />
        </PopoverTrigger>

        <PopoverContent bg="white">
          <PopoverHeader>Médicos Disponíveis</PopoverHeader>
          <PopoverArrow bg="white" />
          <PopoverBody display="flex" flexDir="column" gap={1}>
            {staffsFounded?.map((staff) => (
              <SearchResultButton
                key={staff.id}
                onClick={(e) => {
                  setStaffSelected(staff.fullName)
                  setSelectOne(true)
                }}
                value={staff.id}
                name={name}
                ref={ref}
                onChange={onChange}
                onBlur={onBlur}
              >
                {staff.fullName}
              </SearchResultButton>
            ))}
          </PopoverBody>
        </PopoverContent>
      </Popover>
    )
  },
)
