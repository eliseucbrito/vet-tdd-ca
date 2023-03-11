import { Wrap, WrapItem } from '@chakra-ui/react'
import { PatientCard } from './components/PatientCard'

export default function Patients() {
  return (
    <Wrap
      flexWrap="wrap"
      align="start"
      p="1rem 1rem 1rem 1.5rem"
      w="100%"
      h="100%"
      spacing={6}
    >
      <WrapItem>
        <PatientCard rounded />
      </WrapItem>
      <WrapItem>
        <PatientCard rounded />
      </WrapItem>
      <WrapItem>
        <PatientCard rounded />
      </WrapItem>
      <WrapItem>
        <PatientCard rounded />
      </WrapItem>
      <WrapItem>
        <PatientCard rounded />
      </WrapItem>
      <WrapItem>
        <PatientCard rounded />
      </WrapItem>
      <WrapItem>
        <PatientCard rounded />
      </WrapItem>
      <WrapItem>
        <PatientCard rounded />
      </WrapItem>
      <WrapItem>
        <PatientCard rounded />
      </WrapItem>
      <WrapItem>
        <PatientCard rounded />
      </WrapItem>
      <WrapItem>
        <PatientCard rounded />
      </WrapItem>
      <WrapItem>
        <PatientCard rounded />
      </WrapItem>
      <WrapItem>
        <PatientCard rounded />
      </WrapItem>
      <WrapItem>
        <PatientCard rounded />
      </WrapItem>
    </Wrap>
  )
}
