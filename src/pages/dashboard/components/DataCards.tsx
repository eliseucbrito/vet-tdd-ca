import {
  Flex,
  HStack,
  Image as ChakraImage,
  Text,
  VStack,
} from '@chakra-ui/react'
import Image from 'next/image'
import tes from '../../../presentation/Assets/logo.svg'

import chart from '../../../presentation/Assets/chart.svg'
import dog from '../../../presentation/Assets/dog.svg'
import rooms from '../../../presentation/Assets/rooms.svg'
import staff from '../../../presentation/Assets/staff.svg'
import dna from '../../../presentation/Assets/dna.svg'
import { DataCard } from './DataCard'

export function DataCards() {
  return (
    <Flex w="100%" justify="space-between">
      <DataCard
        label={'Clientes'}
        total={100}
        sublabel={'Hoje'}
        subtotal={32}
        image={<ChakraImage as={Image} src={dog} />}
      />

      {/* <ChakraImage w="12.5%" as={Image} src={dna} /> */}

      <DataCard
        label={'Equipe'}
        total={100}
        sublabel={'De plantão'}
        subtotal={3}
        image={<ChakraImage as={Image} src={staff} />}
      />

      {/* <ChakraImage w="12.5%" as={Image} src={dna} /> */}

      <DataCard
        label={'Quartos'}
        total={100}
        sublabel={'Em uso'}
        subtotal={32}
        image={<ChakraImage as={Image} src={rooms} />}
      />
    </Flex>
  )
}
