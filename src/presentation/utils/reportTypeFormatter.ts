export function reportTypeFormatter(type: string) {
  switch (type) {
    case 'PAYMENT':
      return 'Pagamento'
    case 'REQUEST':
      return 'Solicitação'
    case 'REPORT':
      return 'Relatório'
    default:
      return 'desconhecido'
  }
}
