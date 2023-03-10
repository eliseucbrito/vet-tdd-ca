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
import { Reports } from './Reports'

export default function Dashboard() {
  return (
    <Flex w="100vw" h="100vh">
      <Sidebar />
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
              <LastPatients />
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
    </Flex>
  )
}
