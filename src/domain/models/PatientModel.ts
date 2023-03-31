export enum Kinds {
  DOG,
  CAT,
  REPTILE,
  BIRD,
  FISH,
  CATTLE,
}

export type PatientModel = {
  id: number
  owner: string
  createdAt: string
  name: string
  ownerContact: string
  breed: string
  birthDate: string
  avatarUrl: string
  kind: Kinds
  sex: 'MALE' | 'FEMALE'
}
