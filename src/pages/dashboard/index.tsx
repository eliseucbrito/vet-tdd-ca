import {
  Box,
  Flex,
  Grid,
  GridItem,
  HStack,
  Text,
  VStack,
} from '@chakra-ui/react'
import { DataCards } from './components/DataCards'
import { FinanceCard } from './components/FinanceCard'
import { LastPatients } from './components/LastPatients'
import { SearchBar } from './components/SearchBar'
import { Reports } from './components/Reports'
import { NewPatientModal } from 'presentation/components/Modals/NewPatientModal'
import { NewServiceModal } from 'presentation/components/Modals/NewServiceModal'
import { useContext } from 'react'
import { UserContext } from 'presentation/context/UserContext'
import { OnDutyButton } from 'presentation/components/Modals/OnDutyButton'
import { useServices } from 'presentation/hooks/useServices'
import { Container } from 'presentation/components/Defaults/Container'

export default function Dashboard() {
  const { user } = useContext(UserContext)
  const { data: lastServices } = useServices()

  return (
    <Container flexDir='column'>
      <Flex mb={5} w="100%" justify="space-between" align="center">
        <VStack align="start">
          <Text
            lineHeight={1}
            color="green.900"
            fontWeight={600}
            fontSize="2xl"
          >
            Bem vindo(a) novamente, {user?.fullName.split(' ')[0]}
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

        <HStack>
          <OnDutyButton />
          <NewServiceModal />
          <NewPatientModal />
        </HStack>
      </Flex>

      <DataCards />

      <Grid templateColumns="65% 30%" mt={4} columnGap="5%">
        <GridItem>
          <VStack w="100%" overflow="auto">
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
    </Container>
  )
}

// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//   const axios = new AxiosHttpClient()
//   const { 'vet.token': token } = parseCookies(ctx)
//   const { body: lastServices } = await axios.request({
//     method: 'get',
//     url: 'api/services/v2',
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   })

//   const { body: reports } = await axios.request({
//     method: 'get',
//     url: 'api/reports/v2',
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   })

//   return {
//     props: { lastServices, reports },
//   }
// }
