import {
  Flex,
  Show,
  Text,
  Icon,
  VStack,
  Image as ChakraImage,
  Button as ChakraButton,
  Heading,
  FormLabel,
  Box,
  InputGroup,
  InputRightElement,
  HStack,
  Checkbox,
} from '@chakra-ui/react'
import { FloatingInput } from './components/FloatingInput'
import Image from 'next/image'
import Veterinary from '../../presentation/Assets/veterinary.svg'
import Logo from '../../presentation/Assets/logo.svg'
import { MdOutlineLogin } from 'react-icons/md'
import { useState } from 'react'
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai'
import { Button } from '../../presentation/components/Buttons/Button'
import Link from 'next/link'
import { Validation } from './../../presentation/protocols/validation'

type Props = {
  validation: Validation
}

export default function Login({ validation }: Props) {
  const [show, setShow] = useState<boolean>(false)
  const [isFocused, setIsFocused] = useState<boolean>(false)
  const handleClick = () => setShow(!show)

  return (
    <Flex w="100%">
      <VStack w="100%" h="100%" align="center" justify="center" p="1rem">
        <Heading w="100%" justifyContent="flex-start">
          <ChakraImage as={Image} alt="" src={Logo} />
        </Heading>

        <Flex w="100%" h="100%" align="center" justify="center" p="1rem">
          <Box as={'form'} bg="white" borderRadius={12} py={8} px={12}>
            <Flex align="center" gap="0.5rem">
              <MdOutlineLogin size={24} color="#18C29C" />
              <Text fontSize="1.5rem" fontWeight={600} color="green.700">
                Faça seu login
              </Text>
            </Flex>
            <Text color="green.700" fontWeight={500}>
              Entre com suas informações de cadastro.
            </Text>

            <FormLabel pt={4} htmlFor="email-input">
              E-mail
            </FormLabel>
            <FloatingInput id="email-input" data-testid="email-input" />

            <FormLabel pt={4} htmlFor="password-input">
              Senha
            </FormLabel>
            <InputGroup
              w="100%"
              transition="all 0.2s"
              sx={
                isFocused
                  ? { transform: 'translateY(-2px)' }
                  : { transform: '0' }
              }
            >
              <FloatingInput
                id="password-input"
                data-testid="password-input"
                type={show ? 'text' : 'password'}
                onFocus={() => {
                  setIsFocused(true)
                }}
                onBlur={() => {
                  setIsFocused(false)
                }}
              />

              <InputRightElement>
                <ChakraButton
                  variant="unstyled"
                  onClick={handleClick}
                  display="flex"
                >
                  {show ? (
                    <Icon as={AiOutlineEyeInvisible} boxSize={'20px'} />
                  ) : (
                    <Icon as={AiOutlineEye} boxSize={'20px'} />
                  )}
                </ChakraButton>
              </InputRightElement>
            </InputGroup>
            <HStack py={2} justify="space-between">
              <Checkbox>Lembrar-me</Checkbox>

              <Text
                as={Link}
                href={'/recover'}
                color="green.600"
                fontWeight={600}
                fontSize="0.875rem"
                lineHeight={1.6}
              >
                Esqueci minha senha
              </Text>
            </HStack>
            <Button w="100%" bg="green.600" color="white">
              ENTRAR
            </Button>
          </Box>
        </Flex>
      </VStack>
      <Show above="md">
        <VStack w="100%" bg="green.600" justify="center">
          <VStack>
            <Text color="white.200" fontWeight={700} fontSize="1.5rem">
              Seu Pet é Parte
              <br />
              da Sua Familia
            </Text>
            <Text
              color="white.200"
              fontWeight={300}
              textAlign="center"
              whiteSpace="pre-wrap"
            >
              Deixe-nos tratar seu animal de estimação
              <br />
              como nossa própria família com o melhor serviço
            </Text>
          </VStack>
          <ChakraImage
            as={Image}
            alt=""
            src={Veterinary}
            filter="drop-shadow(5px 5px 5px rgba(0,0,0,0.3))"
          />
        </VStack>
      </Show>
    </Flex>
  )
}
