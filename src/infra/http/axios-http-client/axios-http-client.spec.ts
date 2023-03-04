import { faker } from '@faker-js/faker';
import axios from "axios";
import { HttpPostParams } from 'data/protocols/http';
import { AxiosHttpClient } from "./axios-http-client";

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>
const mockedAxiosResult = {
  data: faker.helpers.arrayElements(),
  status: faker.random.numeric(3)
}
mockedAxios.post.mockResolvedValue(mockedAxiosResult)

const makeSut = (): AxiosHttpClient => {
  return new AxiosHttpClient()
}

const mockPostRequest = (): HttpPostParams<any> => ({
  url: faker.internet.url(),
  body: faker.helpers.arrayElements()
})

describe("AxiosHttpAxios", () => {
  test('Should call axios with correct url and verb', async () => {
    const url = faker.internet.url()
    const sut = makeSut()
    await sut.post({ url })
    expect(mockedAxios.post).toHaveBeenCalledWith(url)
  })

  test('Should call axios with correct body', async () => {
    const sut = makeSut()
    const httpResponse = await sut.post({ url: faker.internet.url() })
    expect(httpResponse).toEqual({
      statusCode: mockedAxiosResult.status,
      body: mockedAxiosResult.data,
    })
  })
})

export { };

