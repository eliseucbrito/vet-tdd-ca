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
  createdAt: Date
  name: string
  ownerContact: number
  breed: string
  birthDate: Date
  avatarUrl: string
  kind: Kinds
}
