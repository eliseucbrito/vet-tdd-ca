import {
  Flex,
  HStack,
  VStack,
  Icon,
  Button,
  Box,
  Avatar,
  Text,
  Spinner,
  useDisclosure,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
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
import { createContext, useContext, useState } from 'react'
import { CgLogOut } from 'react-icons/cg'
import { SignOut } from 'presentation/context/UserContext'
import { UserContext } from './../../context/UserContext'

type SidebarContextData = {
  sidebarOpen: boolean
}

export const SidebarContext = createContext({} as SidebarContextData)

export function Sidebar() {
  const { user } = useContext(UserContext)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure()

  function handleSidebarState() {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <VStack
      w={sidebarOpen ? '16rem' : '4rem'}
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
          <SidebarButton href="/finances" icon={FiPieChart} label="Finanças" />
        </VStack>

        <Flex
          justify="space-between"
          align="center"
          bg="green.300"
          w="100%"
          px={2}
          py={3}
        >
          {user === undefined ? (
            <Spinner />
          ) : (
            <>
              <Avatar
                size="md"
                src={user.avatarUrl}
                borderRadius={8}
                display={sidebarOpen ? 'block' : 'none'}
                mr={1}
              />
              <VStack
                align="flex-start"
                justify="center"
                display={sidebarOpen ? 'block' : 'none'}
              >
                <Text lineHeight={1} whiteSpace="nowrap">
                  {user.fullName}
                </Text>
                <Text lineHeight={0.5} fontWeight={300} fontSize="xs">
                  {user.role.description}
                </Text>
              </VStack>
            </>
          )}

          <Button variant="unstyled" onClick={onOpen}>
            <Icon margin="0 auto" as={CgLogOut} boxSize={6} />
          </Button>

          <Modal isOpen={isOpen} onClose={onClose} isCentered size="xs">
            <ModalOverlay />
            <ModalContent>
              <ModalBody>Confirmar logout</ModalBody>

              <ModalFooter
                w="100%"
                display="flex"
                justifyContent="space-between"
                border={0}
              >
                <Button w="48%" onClick={onClose}>
                  Cancelar
                </Button>
                <Button
                  w="48%"
                  onClick={SignOut}
                  background={'green.600'}
                  _hover={{ background: 'green.800' }}
                >
                  Confirmar
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Flex>
      </SidebarContext.Provider>
    </VStack>
  )
}
