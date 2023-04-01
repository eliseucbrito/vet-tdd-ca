export function hourFormatter(totalminutes: number) {
  const minutesAmount = totalminutes % 60
  const hoursAmount = Math.floor(totalminutes / 60)

  const minutes = String(minutesAmount).padStart(2, '0')
  const hours = String(hoursAmount).padStart(2, '0')

  const hourFormatted = `${hours}:${minutes}`
  return hourFormatted
}
