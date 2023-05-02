import { Flex, Spinner, Text } from '@chakra-ui/react'
import { ApexOptions } from 'apexcharts'
import dynamic from 'next/dynamic'
import { useCities } from 'presentation/hooks/useCities'
import { useServicesPerCity } from 'presentation/hooks/useServicesPerCity'

type ApexGeneric = ApexOptions & any
const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
})

export function BarChart() {
  const {
    data: servicesPerCity,
    isError: servicesError,
    isLoading: servicesLoading,
  } = useServicesPerCity()
  const {
    data: cities,
    isError: citiesError,
    isLoading: citiesLoading,
  } = useCities()

  if (servicesError || citiesError) {
    return (
      <Flex
        flexDir="column"
        bg="white"
        w="100%"
        h="100%"
        maxW="max-content"
        borderRadius={12}
        p="1rem"
        justify="space-between"
      >
        <Text fontWeight={600}>Atendimentos diários por cidade</Text>

        <Text>ERRORR</Text>
      </Flex>
    )
  }

  if (servicesLoading || citiesLoading) {
    ;<Flex
      flexDir="column"
      bg="white"
      w="100%"
      h="100%"
      maxW="max-content"
      borderRadius={12}
      p="1rem"
      justify="space-between"
    >
      <Text fontWeight={600}>Atendimentos diários por cidade</Text>

      <Spinner />
    </Flex>
  }

  const barChartOptions: ApexGeneric = {
    chart: {
      toolbar: {
        show: false,
      },
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 150,
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350,
        },
      },
    },
    tooltip: {
      style: {
        fontSize: '12px',
        fontFamily: undefined,
      },
      onDatasetHover: {
        style: {
          fontSize: '12px',
          fontFamily: undefined,
        },
      },
      theme: 'dark',
    },
    xaxis: {
      categories: cities?.map((city) => city.name.replace(/-(.*)/, ' ')),
      show: false,
      labels: {
        show: true,
        style: {
          colors: '#A3AED0',
          fontSize: '14px',
          fontWeight: '500',
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      show: false,
      color: 'black',
      labels: {
        show: true,
        style: {
          colors: '#CBD5E0',
          fontSize: '14px',
        },
      },
    },
    grid: {
      show: false,
      strokeDashArray: 5,
      yaxis: {
        lines: {
          show: true,
        },
      },
      xaxis: {
        lines: {
          show: false,
        },
      },
    },
    fill: {
      type: 'gradient',
      gradient: {
        type: 'vertical',
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.9,
        colorStops: [
          [
            {
              offset: 0,
              color: '#4318FF',
              opacity: 1,
            },
            {
              offset: 100,
              color: 'rgba(67, 24, 255, 1)',
              opacity: 0.28,
            },
          ],
        ],
      },
    },
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      bar: {
        borderRadius: 10,
        columnWidth: '40px',
      },
    },
  }

  const servicesInEachCity = cities?.map(
    (city) => servicesPerCity?.monthlyServicesPerCity[city.name],
  )

  const totalServicesToday = servicesInEachCity?.reduce((prev, cur, index) => {
    return prev + cur
  })

  if (totalServicesToday === 0) {
    return (
      <Flex
        flexDir="column"
        bg="white"
        w="100%"
        h="100%"
        maxW="max-content"
        borderRadius={12}
        p="1rem"
        justify="space-between"
      >
        <Text fontWeight={600}>Atendimentos diários por cidade</Text>

        <Text>SEM ATENDIMENTOS</Text>
      </Flex>
    )
  }

  const barChartData = [
    {
      name: 'Atendimentos hoje',
      data: servicesInEachCity,
    },
  ]

  return (
    <Flex
      flexDir="column"
      bg="white"
      w="100%"
      h="100%"
      maxW="max-content"
      borderRadius={12}
      p="1rem"
      justify="space-between"
    >
      <Text fontWeight={600}>Atendimentos diários por cidade</Text>
      <Text>Total: {totalServicesToday}</Text>

      <ReactApexChart
        options={barChartOptions}
        series={barChartData}
        type="bar"
      />
    </Flex>
  )
}
