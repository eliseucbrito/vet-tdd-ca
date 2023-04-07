/* eslint-disable react/display-name */
/* eslint-disable no-undef */
import {
  Popover,
  PopoverTrigger,
  Input,
  PopoverContent,
  PopoverBody,
  Button,
} from '@chakra-ui/react'
import { StaffContext } from 'presentation/context/StaffContext'
import { forwardRef, useContext, useEffect, useState } from 'react'
import { ChangeHandler } from 'react-hook-form'

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
    const { searchForAStaff, staffsFounded } = useContext(StaffContext)
    console.log('STAFF SELECTED NAME ', staffSelected)

    function handleSearchForStaff(search: string) {
      console.log('SEARCH: ', search)
      searchForAStaff(search)
    }

    useEffect(() => {
      if (clearValue) setStaffSelected('')
    }, [clearValue])

    return (
      <Popover
        autoFocus={false}
        isOpen={staffsFounded.length > 0 && isOpen}
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
            }}
          />
        </PopoverTrigger>
        <PopoverContent bg="gray.400">
          <PopoverBody>
            {staffsFounded.map((staff) => (
              <Button
                key={staff.id}
                onClick={(e) => setStaffSelected(staff.fullName)}
                value={staff.id}
                name={name}
                ref={ref}
                onChange={onChange}
                onBlur={onBlur}
              >
                {staff.fullName}
              </Button>
            ))}
          </PopoverBody>
        </PopoverContent>
      </Popover>
    )
  },
)
