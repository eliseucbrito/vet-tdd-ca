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

interface BreedSearchProps {
  isOpen: boolean
  isError: boolean
  // PROPS FOR USE {...register}
  name: string
  onBlur: ChangeHandler
  onChange: ChangeHandler
  clearValue?: boolean
}

export const BreedSearchInput = forwardRef<HTMLInputElement, BreedSearchProps>(
  (
    { isError, isOpen, name, onBlur, onChange, clearValue }: BreedSearchProps,
    ref,
  ) => {
    const [breedSelected, setBreedSelected] = useState('')
    const [searchingFor, setSearchingFor] = useState('')
    const [selectOne, setSelectOne] = useState(false)
    const { searchForBreed, breedsFounded } = useContext(SearchContext)

    function handleSearchForBreed(search: string) {
      searchForBreed(search)
      setSearchingFor(search)
    }

    useEffect(() => {
      if (clearValue) setBreedSelected('')
      setSelectOne(false)
      setSearchingFor('')
    }, [clearValue])

    const hasOneSelected = selectOne && breedSelected !== ''

    return (
      <Popover
        autoFocus={false}
        isOpen={
          breedsFounded?.length > 0 &&
          isOpen &&
          !hasOneSelected &&
          searchingFor !== ''
        }
        closeOnBlur={true}
        onClose={() => handleSearchForBreed('')}
      >
        <PopoverTrigger>
          <Input
            w="100%"
            placeholder="Raça"
            isInvalid={isError}
            marginBottom={2}
            value={breedSelected}
            onChange={(e) => {
              onChange(e)
              handleSearchForBreed(e.target.value)
              setBreedSelected(e.target.value)

              if (e.target.value !== breedSelected) {
                setSelectOne(false)
              }
            }}
            name={name}
            ref={ref}
            onBlur={onBlur}
          />
        </PopoverTrigger>

        <PopoverContent bg="white">
          <PopoverHeader>Raças encontradas</PopoverHeader>
          <PopoverArrow bg="white" />
          <PopoverBody display="flex" flexDir="column" gap={1}>
            {breedsFounded.map((breed) => (
              <SearchResultButton
                key={breed}
                onClick={(e) => {
                  setBreedSelected(breed)
                  setSelectOne(true)
                }}
                value={breed}
              >
                {breed}
              </SearchResultButton>
            ))}
          </PopoverBody>
        </PopoverContent>
      </Popover>
    )
  },
)
