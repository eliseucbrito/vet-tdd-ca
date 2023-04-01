import {
  Stat,
  StatArrow,
  StatGroup,
  StatHelpText,
  StatLabel,
  StatNumber,
} from '@chakra-ui/react'
import { FormattedNumber } from 'react-intl'

interface StatsIndicatorProps {
  label: string
  stat: number
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

  const anyValueIsZero = totalNewValue === 0 || totalOldValue === 0
  const percentage = anyValueIsZero
    ? finalBalance / 1
    : (finalBalance / totalOldValue) * 100

  return (
    <StatGroup>
      <Stat>
        <StatLabel color="gray.200">{label}</StatLabel>
        <StatNumber fontSize="1.2 5rem">
          <FormattedNumber
            value={stat}
            currency="BRL"
            maximumFractionDigits={2}
            minimumFractionDigits={2}
            style={'currency'}
          />
        </StatNumber>
        <StatHelpText>
          <StatArrow type={finalBalanceIsPositive ? 'increase' : 'decrease'} />
          <FormattedNumber
            value={percentage / 100}
            maximumFractionDigits={2}
            style={'percent'}
          />
        </StatHelpText>
      </Stat>
    </StatGroup>
  )
}
