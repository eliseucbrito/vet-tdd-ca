import {
  Flex,
  HStack,
  VStack,
  Icon,
  Button,
  Box,
  Avatar,
  Text,
} from '@chakra-ui/react'
import { SidebarButton } from './SidebarButton'
import {
  FiClipboard,
  FiFolder,
  FiGrid,
  FiMenu,
  FiPieChart,
  FiUsers,
} from 'react-icons/fi'
import { TbPaw } from 'react-icons/tb'
import Image from 'next/image'
import Logo from '../../Assets/logo-dark.svg'
import { createContext, useState } from 'react'
import { CgLogOut } from 'react-icons/cg'

type SidebarContextData = {
  sidebarOpen: boolean
}

export const SidebarContext = createContext({} as SidebarContextData)

export function Sidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  function handleSidebarState() {
    setSidebarOpen(!sidebarOpen)
    console.log('SIDEBAR OPEN ', !sidebarOpen)
  }

  return (
    <VStack
      w={sidebarOpen ? '12rem' : '4rem'}
      h="100%"
      justify="space-between"
      transition="all 0.25s ease-in-out"
      bg="green.600"
      overflow="hidden"
    >
      <SidebarContext.Provider value={{ sidebarOpen }}>
        <VStack gap={1} px={3} py={1} w="100%">
          <HStack w="100%" justify="space-between">
            {sidebarOpen && <Image alt="" src={Logo} />}
            <Box p={2}>
              <Button
                onClick={handleSidebarState}
                cursor="pointer"
                variant="unstyled"
                size="xs"
                as={FiMenu}
              />
            </Box>
          </HStack>
          <SidebarButton href="/dashboard" icon={FiGrid} label="Dashboard" />
          <SidebarButton href="/patients" icon={TbPaw} label="Pacientes" />
          <SidebarButton href="/staff" icon={FiUsers} label="Staff" />
          <SidebarButton
            href="/services"
            icon={FiFolder}
            label="Atendimentos"
          />
          <SidebarButton
            href="/reports"
            icon={FiClipboard}
            label="Relatórios"
          />
          <SidebarButton href="/finance" icon={FiPieChart} label="Finanças" />
        </VStack>

        <Flex
          justify="space-between"
          align="center"
          bg="green.300"
          w="100%"
          px={2}
          py={3}
        >
          <Avatar
            size="md"
            borderRadius={8}
            display={sidebarOpen ? 'block' : 'none'}
            mr={1}
          />
          <VStack
            align="flex-start"
            justify="center"
            display={sidebarOpen ? 'block' : 'none'}
          >
            <Text lineHeight={1}>Nome Func</Text>
            <Text lineHeight={0.5} fontWeight={300} fontSize="xs">
              Cargo
            </Text>
          </VStack>

          <Icon margin="0 auto" as={CgLogOut} boxSize={6} />
        </Flex>
      </SidebarContext.Provider>
    </VStack>
  )
}
