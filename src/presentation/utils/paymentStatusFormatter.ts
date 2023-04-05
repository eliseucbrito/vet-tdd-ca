import { PaymentStatus } from 'domain/models/ServiceModel'

export function paymentStatusFormatter(status: PaymentStatus) {
  switch (status) {
    case PaymentStatus.CANCELED:
      return 'Cancelado'
    case PaymentStatus.PAID:
      return 'Pago'
    case PaymentStatus.WAITING_PAYMENT:
      return 'Aguardando Pagamento'
    default:
      return '???'
  }
}

export function paymentStatusColor(status: PaymentStatus) {
  switch (status) {
    case PaymentStatus.CANCELED:
      return 'gray.400'
    case PaymentStatus.PAID:
      return 'green.400'
    case PaymentStatus.WAITING_PAYMENT:
      return 'yellow.400'
    default:
      return 'purple'
  }
}
