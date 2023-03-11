import { Flex, Icon, Show, Text } from '@chakra-ui/react'
import { IconType } from 'react-icons'
import Link from 'next/link'
import { useContext } from 'react'
import { SidebarContext } from './Sidebar'
import { useRouter } from 'next/router'

interface SidebarButtonProps {
  label: string
  icon: IconType
  href: string
}

export function SidebarButton({ icon, label, href }: SidebarButtonProps) {
  const { sidebarOpen } = useContext(SidebarContext)
  const { asPath } = useRouter()
  const activeLink = asPath === href

  return (
    <Flex
      bg={activeLink ? 'green.300' : 'transparent'}
      transition="background 0.3s"
      _hover={{ background: 'green.300' }}
      as={Link}
      href={href}
      w="100%"
      p={2}
      gap={2}
      align="center"
      borderRadius={8}
    >
      <Icon as={icon} boxSize={6} />
      <Text display={sidebarOpen ? 'block' : 'none'}>{label}</Text>
    </Flex>
  )
}
