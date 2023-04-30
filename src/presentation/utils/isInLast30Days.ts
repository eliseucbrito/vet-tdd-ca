import dayjs from 'dayjs'

export function isInLast30Days(date: string) {
  const oneMonthAgo = dayjs()
    .subtract(30, 'days')
    .set('hours', 0)
    .set('minutes', 0)
    .set('seconds', 0)
  const today = dayjs()
  const dateReceived = dayjs(date)

  if (dateReceived.isAfter(oneMonthAgo) && dateReceived.isBefore(today)) {
    return true
  } else {
    return false
  }
}
