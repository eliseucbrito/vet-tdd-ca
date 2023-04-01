export function ageFormatter(birthDateString: string) {
  const now = new Date()
  const birthdate = new Date(birthDateString)
  let years = now.getFullYear() - birthdate.getFullYear()
  let months = now.getMonth() - birthdate.getMonth()
  if (months < 0 || (months === 0 && now.getDate() < birthdate.getDate())) {
    years--
    months += 12
  }
  let ageString = ''
  if (years > 0) {
    ageString += years + ' ano'
    if (years > 1) {
      ageString += 's'
    }
  }
  if (months > 0) {
    if (years > 0) {
      ageString += ' e '
    }
    ageString += months + ' mês'
    if (months > 1) {
      ageString = ageString.replace(' mês', ' meses')
    }
  }
  if (ageString === '') {
    ageString = 'menos que um mês'
  }
  return ageString
}
