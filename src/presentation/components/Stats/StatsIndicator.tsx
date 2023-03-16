import {
  StatGroup,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
} from '@chakra-ui/react'

interface StatsIndicatorProps {
  label: string
  stat: string | number
  oldValue: object[] | number[]
  newValue: object[] | number[]
}

export function StatsIndicator({
  label,
  stat,
  newValue,
  oldValue,
}: StatsIndicatorProps) {
  let totalOldValue = 0
  let totalNewValue = 0

  oldValue.forEach((value) => {
    totalOldValue = totalOldValue + value
  })

  newValue.forEach((value) => {
    totalNewValue = totalNewValue + value
  })

  const finalBalance = totalNewValue - totalOldValue

  const finalBalanceIsPositive = finalBalance >= 0

  const percentage = (finalBalance / totalOldValue) * 100

  return (
    <StatGroup>
      <Stat>
        <StatLabel color="gray.200">{label}</StatLabel>
        <StatNumber fontSize="1.2 5rem">{stat}</StatNumber>
        <StatHelpText>
          <StatArrow type={finalBalanceIsPositive ? 'increase' : 'decrease'} />
          {percentage}%
        </StatHelpText>
      </Stat>
    </StatGroup>
  )
}
