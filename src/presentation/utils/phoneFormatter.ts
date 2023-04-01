export function phoneFormatter(phone: string) {
  const phoneArray = phone.split('')

  const phoneFormatted = `(${phoneArray[0] + phoneArray[1]}) ${phoneArray[2]}.${
    phoneArray[3] + phoneArray[4] + phoneArray[5] + phoneArray[6]
  }-${phoneArray[7] + phoneArray[8] + phoneArray[9] + phoneArray[10]}`

  return phoneFormatted
}
