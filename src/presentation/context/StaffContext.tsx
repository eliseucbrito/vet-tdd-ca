import { useStaff } from 'presentation/hooks/useStaff'
import { createContext, ReactNode, useState } from 'react'
import { StaffReducedModel } from 'domain/models/StaffModel'
import { usePatients } from 'presentation/hooks/usePatients'
import { PatientReducedModel } from 'domain/models/PatientModel'

type StaffContextData = {
  searchForAStaffForService(name: string): void
  staffsFounded: StaffReducedModel[]
  searchForPatient(name: string): void
  patientsFounded: PatientReducedModel[]
}

export const StaffContext = createContext({} as StaffContextData)

interface StaffContextProps {
  children: ReactNode
}

export function StaffContextProvider({ children }: StaffContextProps) {
  const [staffsFounded, setStaffsFounded] = useState<StaffReducedModel[]>([])
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
    console.log('SEARCH: ', name.toLowerCase())
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
    console.log('SEARCH: ', name.toLowerCase())
    const founded = allPatients?.filter((patient) =>
      patient.name.toLowerCase().includes(name.toLowerCase()),
    )

    if (name === '' || name === undefined) {
      setStaffsFounded([])
    } else {
      setPatientsFounded(founded)
    }
  }

  console.log('FOUNDED STAFF CONTEXT ', staffsFounded)
  console.log('FOUNDED PATIENTS CONTEXT ', patientsFounded)

  return (
    <StaffContext.Provider
      value={{
        searchForAStaffForService,
        staffsFounded,
        patientsFounded,
        searchForPatient,
      }}
    >
      {children}
    </StaffContext.Provider>
  )
}
