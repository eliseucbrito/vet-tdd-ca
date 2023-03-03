import { faker } from '@faker-js/faker';
import { AccountModel } from 'domain/models/AccountModel';
import { AuthenticationParams } from 'domain/usecases/authentication';

export const mockAuthentication = (): AuthenticationParams => ({
  email: faker.internet.email(),
  password: faker.internet.password(),
})

export const mockAccountModel = (): AccountModel => ({
  accessToken: faker.datatype.uuid()
})
