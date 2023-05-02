import {
  Box,
  Flex,
  Grid,
  GridItem,
  HStack,
  Text,
  VStack,
} from '@chakra-ui/react'
import { NewPatientModal } from 'presentation/components/Modals/NewPatientModal'
import { NewServiceModal } from 'presentation/components/Modals/NewServiceModal'
import { useContext } from 'react'
import { UserContext } from 'presentation/context/UserContext'
import { OnDutyButton } from 'presentation/components/Modals/OnDutyButton'
import { useServices } from 'presentation/hooks/useServices'
import { Container } from 'presentation/components/Defaults/Container'
import { DataCards } from 'presentation/components/Dashboard/DataCards'
import { FinanceCard } from 'presentation/components/Dashboard/FinanceCard'
import { LastPatients } from 'presentation/components/Dashboard/LastPatients'
import { ServicesPerPatientSearchBar } from 'presentation/components/Dashboard/ServicesPerPatientSearchBar'
import { Reports } from 'presentation/components/Dashboard/Reports'

export default function Dashboard() {
  const { user } = useContext(UserContext)
  const { data: lastServices } = useServices()

  return (
    <Container flexDir="column">
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
            <ServicesPerPatientSearchBar />
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
