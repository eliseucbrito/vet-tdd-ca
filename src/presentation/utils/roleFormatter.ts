export function roleFormatter(role: String) {
  switch (role) {
    case 'CEO':
      return 'CEO & CTO'

    case 'GENERAL_MANAGER':
      return 'Gerente Geral'

    case 'MANAGER':
      return 'Gerente'

    case 'VETERINARY':
      return 'Veterinário'

    case 'ASSISTANT':
      return 'Assistente'

    case 'INTERN':
      return 'Estagiário'

    default:
      return '???'
  }
}
