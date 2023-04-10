import { useStaff } from 'presentation/hooks/useStaff'
import { createContext, ReactNode, useState } from 'react'
import { StaffReducedModel } from 'domain/models/StaffModel'
import { usePatients } from 'presentation/hooks/usePatients'
import { PatientReducedModel } from 'domain/models/PatientModel'

type SearchContextData = {
  searchForAStaffForService(name: string): void
  staffsFounded: StaffReducedModel[]
  searchForPatient(name: string): void
  patientsFounded: PatientReducedModel[]
  searchForBreed(name: string): void
  breedsFounded: string[]
}

export const SearchContext = createContext({} as SearchContextData)

interface SearchContextProps {
  children: ReactNode
}

export function SearchContextProvider({ children }: SearchContextProps) {
  const [staffsFounded, setStaffsFounded] = useState<StaffReducedModel[]>([])
  const [breedsFounded, setBreedsFounded] = useState<string[]>([])
  const [patientsFounded, setPatientsFounded] = useState<PatientReducedModel[]>(
    [],
  )

  const { data: allStaff } = useStaff()
  const { data: allPatients } = usePatients()

  const notAllowedRolesToDoAService = ['ASSISTANT', 'INTERN']

  const staffWhoCanDoServices = allStaff?.filter(
    (staff) => !notAllowedRolesToDoAService.includes(staff.role.description),
  )

  function searchForAStaffForService(name: string) {
    const founded = staffWhoCanDoServices.filter((staff) =>
      staff.fullName.toLowerCase().includes(name.toLowerCase()),
    )

    if (name === '' || name === undefined) {
      setStaffsFounded([])
    } else {
      setStaffsFounded(founded)
    }
  }

  function searchForPatient(name: string) {
    const founded = allPatients?.filter((patient) =>
      patient.name.toLowerCase().includes(name.toLowerCase()),
    )

    if (name === '' || name === undefined) {
      setStaffsFounded([])
    } else {
      setPatientsFounded(founded)
    }
  }

  const breeds = []

  allPatients?.forEach((patient) => {
    if (!breeds.includes(patient.breed.toUpperCase())) {
      breeds.push(patient.breed.toUpperCase())
    }
  })

  function searchForBreed(name: string) {
    const founded = breeds?.filter((breed) =>
      breed.includes(name.toUpperCase()),
    )

    if (name === '' || name === undefined) {
      setBreedsFounded([])
    } else {
      setBreedsFounded(founded)
    }
  }

  return (
    <SearchContext.Provider
      value={{
        searchForAStaffForService,
        staffsFounded,
        patientsFounded,
        searchForPatient,
        breedsFounded,
        searchForBreed,
      }}
    >
      {children}
    </SearchContext.Provider>
  )
}
