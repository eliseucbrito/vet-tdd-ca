export function cpfFormatter(cpf: string) {
  const cpfWithSpaces = cpf.replace(/\D/g, '')

  return cpfWithSpaces.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, '$1.$2.$3-$4')
}
