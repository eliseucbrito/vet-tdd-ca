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
  ownerContact: number
  breed: string
  birthDate: string
  avatarUrl: string
  kind: Kinds
  sex: 'MALE' | 'FEMALE'
}
