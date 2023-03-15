import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  Text,
  VStack,
} from '@chakra-ui/react'
import { Sidebar } from 'presentation/components/Sidebar/Sidebar'
import { DataCards } from './components/DataCards'
import { FinanceCard } from './components/FinanceCard'
import { LastPatients } from './components/LastPatients'
import { SearchBar } from './components/SearchBar'
import { Reports } from './components/Reports'
import { AxiosHttpClient } from 'infra/http/axios-http-client/axios-http-client'
import { GetServerSideProps } from 'next'
import { useEffect } from 'react'
import { parseCookies } from 'nookies'

export default function Dashboard({ lastServices }) {
  console.log(lastServices)

  console.log()
  return (
    <Box p="1rem 1rem 1rem 1.5rem" w="100%" h="100%">
      <Flex mb={5}>
        <VStack align="start">
          <Text
            lineHeight={1}
            color="green.900"
            fontWeight={600}
            fontSize="2xl"
          >
            Bem vindo(a) novamente, Eliseu
          </Text>
          <Text
            lineHeight={1}
            color="gray.200"
            fontSize="xs"
            fontWeight={500}
            sx={{ span: { color: 'green.600' } }}
          >
            Sua clinica está trabalhando no modo: <span>Normal</span>
          </Text>
        </VStack>
      </Flex>

      <DataCards />

      <Grid templateColumns="1fr 30%" mt={4} columnGap="5%">
        <GridItem w="100%">
          <VStack w="100%">
            <SearchBar />
            <LastPatients services={lastServices} />
          </VStack>
        </GridItem>
        <GridItem>
          <VStack>
            <FinanceCard />
            <Reports />
          </VStack>
        </GridItem>
      </Grid>
    </Box>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const axios = new AxiosHttpClient()
  const { 'vet.token': token } = parseCookies(ctx)
  const { body: lastServices } = await axios.request({
    method: 'get',
    url: 'api/services/v1',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return {
    props: { lastServices },
  }
}
