import axios from 'axios';
import { mockPostRequest } from '../../../data/test/mock-http-post';
import { mockAxios } from '../../test/index';
import { AxiosHttpClient } from "./axios-http-client";


jest.mock('axios')

type SutTypes = {
  sut: AxiosHttpClient
  mockedAxios: jest.Mocked<typeof axios>
}

const makeSut = (): SutTypes => {
  const sut = new AxiosHttpClient()
  const mockedAxios = mockAxios()
  return {
    sut,
    mockedAxios
  }
}



describe("AxiosHttpAxios", () => {
  test('Should call axios with correct url and verb', async () => {
    const request = mockPostRequest()
    const {sut, mockedAxios} = makeSut()
    await sut.post(request)
    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body)
  })

  test('Should call axios with correct body', () => {
    const {sut, mockedAxios} = makeSut()
    const promise = sut.post(mockPostRequest())
    expect(promise).toEqual(mockedAxios.post.mock.results[0].value)
  })
})

