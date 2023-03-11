import { Wrap, WrapItem } from '@chakra-ui/react'
import React from 'react'
import { StaffCard } from './components/StaffCard'

export default function Staff() {
  return (
    <Wrap
      flexWrap="wrap"
      align="start"
      p="1rem 1rem 1rem 1.5rem"
      w="100%"
      h="100%"
      spacing={8}
    >
      <WrapItem>
        <StaffCard rounded />
      </WrapItem>
      <WrapItem>
        <StaffCard rounded />
      </WrapItem>
      <WrapItem>
        <StaffCard rounded />
      </WrapItem>
      <WrapItem>
        <StaffCard rounded />
      </WrapItem>
      <WrapItem>
        <StaffCard rounded />
      </WrapItem>
      <WrapItem>
        <StaffCard rounded />
      </WrapItem>
      <WrapItem>
        <StaffCard rounded />
      </WrapItem>
      <WrapItem>
        <StaffCard rounded />
      </WrapItem>
      <WrapItem>
        <StaffCard rounded />
      </WrapItem>
    </Wrap>
  )
}
