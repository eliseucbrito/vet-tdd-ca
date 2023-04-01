export function slugToServiceType(slug: string) {
  switch (slug) {
    case 'exams':
      return 'EXAM'
    case 'surgerys':
      return 'SURGERY'
    case 'emergencys':
      return 'EMERGENCY'
  }
}
