import { ServiceStatus } from 'domain/models/ServiceModel'

export function serviceStatusFormatter(status: ServiceStatus) {
  switch (status) {
    case ServiceStatus.CANCELED:
      return 'Cancelado'
    case ServiceStatus.COMPLETED:
      return 'Concluído'
    case ServiceStatus.IN_PROGRESS:
      return 'Em progresso'
    case ServiceStatus.NOT_INITIALIZED:
      return 'Não Inicializado'
    case ServiceStatus.SCHEDULED:
      return 'Agendado'
    default:
      return '???'
  }
}

export function serviceStatusColor(status: ServiceStatus) {
  switch (status) {
    case ServiceStatus.CANCELED:
      return 'gray.400'
    case ServiceStatus.COMPLETED:
      return 'green.600'
    case ServiceStatus.IN_PROGRESS:
      return 'yellow.base'
    case ServiceStatus.NOT_INITIALIZED:
      return 'red'
    case ServiceStatus.SCHEDULED:
      return 'blue'
    default:
      return 'purple'
  }
}
