import { ServiceModel } from './ServiceModel'

export enum Kinds {
  DOG = 'DOG',
  CAT = 'CAT',
  REPTILE = 'REPTILE',
  BIRD = 'BIRD',
  FISH = 'FISH',
  CATTLE = 'CATTLE',
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
  services: ServiceModel[]
}

export type PatientReducedModel = {
  id: number
  owner: string
  name: string
  kind: Kinds
  ownerContact: string
  breed: string
  birthDate: string
  sex: 'MALE' | 'FEMALE'
}
