export function nameFormatter(name: string) {
  const nameSplited = name.split(' ')
  const nameFormatted =
    nameSplited[0] + ' ' + nameSplited[nameSplited.length - 1]
  console.log('ANTES ', name)
  console.log('SPLITED ', nameSplited)
  console.log('DEPOIS ', nameFormatted)
  return nameFormatted
}
