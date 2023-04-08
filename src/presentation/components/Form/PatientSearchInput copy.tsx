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
    const { patientsFounded, searchForPatient } = useContext(StaffContext)
    console.log('PATIENT SELECTED NAME ', patientSelected)

    function handleSearchForStaff(search: string) {
      console.log('SEARCH: ', search)
      setSearchingFor(search)
      searchForPatient(search)
    }

    useEffect(() => {
      if (clearValue) setPatientSelected('')
    }, [clearValue])

    return (
      <Popover
        autoFocus={false}
        isOpen={patientsFounded.length > 0 && isOpen}
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
            }}
          />
        </PopoverTrigger>
        <PopoverContent bg="gray.400">
          <PopoverBody>
            {patientsFounded.map((patient) => (
              <Button
                key={patient.id}
                onClick={(e) => {
                  setPatientSelected(patient.name)
                  if (patient.name === searchingFor) {
                    // Se o paciente selecionado for igual ao paciente pesquisado,
                    // feche o Popover
                    handleSearchForStaff('')
                  }
                }}
                value={patient.id}
                name={name}
                ref={ref}
                onChange={onChange}
                onBlur={onBlur}
              >
                {patient.name}
              </Button>
            ))}
          </PopoverBody>
        </PopoverContent>
      </Popover>
    )
  },
)
