import { Box, Flex, HStack, Wrap, WrapItem } from '@chakra-ui/react'
import { Sidebar } from 'presentation/components/Sidebar/Sidebar'
import { PatientCard } from './components/PatientCard'

export default function Patients() {
  return (
    <Flex w="100vw" h="100vh">
      <Sidebar />
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
    </Flex>
  )
}
