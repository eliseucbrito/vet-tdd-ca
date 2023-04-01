import { Heading, HStack, Icon, Text, VStack } from '@chakra-ui/react'
import Link from 'next/link'
import { FiFolder } from 'react-icons/fi'

export default function Services() {
  const folders = [
    {
      name: 'Exames',
      href: '/services/all/exams',
    },
    {
      name: 'Atendimentos',
      href: '/services/all/medical-cares',
    },
    {
      name: 'Cirurgias',
      href: '/services/all/surgerys',
    },
    {
      name: 'Emergências',
      href: '/services/all/emergencys',
    },
  ]

  return (
    <VStack
      align="start"
      w="100%"
      h="100vh"
      p={['0 1rem', '1rem 1.5rem 1rem 3rem']}
    >
      <Heading
        fontWeight={600}
        fontSize="1.5rem"
        color="green.900"
        lineHeight={1}
      >
        Atendimentos
      </Heading>

      <HStack
        gap="1rem"
        w="100%"
        align="start"
        justify="start"
        pt="1rem"
        flexWrap="wrap"
      >
        {folders.map((folder) => (
          <VStack key={folder.name} as={Link} href={folder.href} align="center">
            <Icon as={FiFolder} boxSize="7rem" />
            <Text fontWeight={600} lineHeight={0}>
              {folder.name}
            </Text>
          </VStack>
        ))}
      </HStack>
    </VStack>
  )
}
