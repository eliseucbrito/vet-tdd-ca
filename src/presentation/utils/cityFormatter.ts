export function cityFormatter(city: string) {
  const cityArray = city.split('-')
  const cityOne =
    cityArray[0].charAt(0).toUpperCase() + cityArray[0].slice(1).toLowerCase()

  return cityOne + '-' + cityArray[1]
}
