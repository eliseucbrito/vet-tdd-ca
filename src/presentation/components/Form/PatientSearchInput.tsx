/* eslint-disable react/display-name */
/* eslint-disable no-undef */
import {
  Popover,
  PopoverTrigger,
  Input,
  PopoverContent,
  PopoverBody,
  Button,
  PopoverHeader,
  PopoverArrow,
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

export const PatientSearchInput = forwardRef<
  HTMLInputElement,
  SearchInputProps
>(
  (
    { isError, isOpen, name, onBlur, onChange, clearValue }: SearchInputProps,
    ref,
  ) => {
    const [patientSelected, setPatientSelected] = useState('')
    const [searchingFor, setSearchingFor] = useState('')
    const [selectOne, setSelectOne] = useState(false)
    const { patientsFounded, searchForPatient } = useContext(SearchContext)

    function handleSearchForStaff(search: string) {
      setSearchingFor(search)
      searchForPatient(search)
    }

    useEffect(() => {
      if (clearValue) setPatientSelected('')
      setSelectOne(false)
      setSearchingFor('')
    }, [clearValue])

    const hasOneSelected = selectOne && patientSelected !== ''

    return (
      <Popover
        autoFocus={false}
        isOpen={
          patientsFounded?.length > 0 &&
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
            placeholder="Paciente"
            isInvalid={isError}
            marginBottom={2}
            value={patientSelected}
            onChange={(e) => {
              handleSearchForStaff(e.target.value)
              setPatientSelected(e.target.value)

              if (e.target.value !== patientSelected) {
                setSelectOne(false)
              }
            }}
          />
        </PopoverTrigger>
        <PopoverContent bg="white">
          <PopoverHeader>Pacientes Encontrados</PopoverHeader>
          <PopoverArrow bg="white" />
          <PopoverBody display="flex" flexDir="column">
            {patientsFounded?.map((patient) => (
              <SearchResultButton
                key={patient.id}
                onClick={(e) => {
                  setPatientSelected(patient.name)
                  setSelectOne(true)
                }}
                value={patient.id}
                name={name}
                ref={ref}
                onChange={onChange}
                onBlur={onBlur}
              >
                {patient.name}
              </SearchResultButton>
            ))}
          </PopoverBody>
        </PopoverContent>
      </Popover>
    )
  },
)
