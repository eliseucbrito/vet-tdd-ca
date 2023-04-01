export function serviceTypeFormatter(type: string) {
  switch (type) {
    case 'EMERGENCY':
      return 'Emergência'
    case 'SURGERY':
      return 'Cirurgia'
    case 'EXAM':
      return 'Exame'
    case 'MEDICAL_CARE':
      return 'Atendimento Médico'
  }
}
