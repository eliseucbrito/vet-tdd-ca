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
import { useVetData } from 'presentation/hooks/useVetData'

export function DataCards() {
  const { data: VetData } = useVetData()

  return (
    <Flex w="100%" justify="space-between">
      <DataCard
        label={'Clientes'}
        total={VetData?.clients.total}
        sublabel={'Hoje'}
        subtotal={VetData?.clients.today}
        image={<ChakraImage as={Image} src={dog} />}
      />

      <DataCard
        label={'Equipe'}
        total={VetData?.staff.total}
        sublabel={'De plantão'}
        subtotal={VetData?.staff.onDuty}
        image={<ChakraImage as={Image} src={staff} />}
      />

      <DataCard
        label={'Pacientes'}
        total={VetData?.patients.total}
        sublabel={'Novos'}
        subtotal={VetData?.patients.today}
        image={<ChakraImage as={Image} src={rooms} />}
      />
    </Flex>
  )
}
