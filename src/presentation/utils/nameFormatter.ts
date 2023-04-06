export function nameFormatter(name: string) {
  const nameSplited = name.split(' ')
  const nameFormatted =
    nameSplited[0] + ' ' + nameSplited[nameSplited.length - 1]



  return nameFormatted
}
