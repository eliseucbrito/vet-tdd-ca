export function kindFormatter(kind: string) {
  switch (kind) {
    case 'DOG':
      return 'Cachorro'
    case 'CAT':
      return 'Gato'
    case 'BIRD':
      return 'Pássaro'
    case 'TURTLE':
      return 'Tartaruga'
    case 'OTTER':
      return 'Lontra'
    case 'REPTILE':
      return 'Réptil'
    case 'FISH':
      return 'Peixe'
    case 'CATTLE':
      return 'Gado Bovino'
    case 'HORSE':
      return 'Cavalo'
    default:
      return '???'
  }
}
