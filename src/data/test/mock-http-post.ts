import { faker } from '@faker-js/faker'
import { HttpPostParams } from 'data/protocols/http'

export const mockPostRequest = (): HttpPostParams<any> => ({
  url: faker.internet.url(),
  method: 'post',
  body: faker.helpers.objectValue({ myProperty: 'myValue' }),
})
