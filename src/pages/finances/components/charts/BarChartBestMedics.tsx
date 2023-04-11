import { Flex, Text } from '@chakra-ui/react'
import { ApexOptions } from 'apexcharts'
import dynamic from 'next/dynamic'
import { useServices } from 'presentation/hooks/useServices'

type ApexGeneric = ApexOptions & any
const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
})

export function BarChartBestMedics() {
  const { data: services } = useServices()

  const staffs = []
  const servicesPerStaff = {}

  services?.forEach((service) => {
    const isToday =
      new Date(service.serviceDate).toLocaleDateString() ===
      new Date().toLocaleDateString()

    if (isToday && !staffs.includes(service.medic.fullName)) {
      staffs.push(service.medic.fullName)
    }

    if (isToday) {
      if (servicesPerStaff[service.medic.fullName] === undefined) {
        servicesPerStaff[service.medic.fullName] = 0
      }

      servicesPerStaff[service.medic.fullName] += 1
    }
  })

  const barChartOptions: ApexGeneric = {
    chart: {
      toolbar: {
        show: false,
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
      categories: staffs,
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

  const totalServicesPerMedic = staffs?.map((staffName) => {
    return servicesPerStaff[staffName]
  })

  const barChartData = [
    {
      name: 'Atendimentos hoje',
      data: totalServicesPerMedic,
    },
  ]

  return (
    <Flex
      flexDir="column"
      bg="white"
      w="max-content"
      h="max-content"
      borderRadius={12}
      p="1rem"
    >
      <Text fontWeight={600}>Mais atendimentos</Text>
      <ReactApexChart
        options={barChartOptions}
        series={barChartData}
        type="bar"
      />
    </Flex>
  )
}
