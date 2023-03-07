import { AccountModel } from 'domain/models/AccountModel'
import { InvalidCredentialsError } from '../../../domain/errors/invalid-credentials-error'
import {
  Authentication,
  AuthenticationParams,
} from '../../../domain/usecases/authentication'
import { HttpPostClient } from '../../protocols/http/http-post-client'
import { HttpStatusCode } from '../../protocols/http/http-client'
import { UnexpectedError } from './../../../domain/errors/unexpected-error'

export class RemoteAuthentication implements Authentication {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<
      AuthenticationParams,
      AccountModel
    >,
  ) {}

  async auth(params: AuthenticationParams): Promise<AccountModel> {
    const httpResponse = await this.httpPostClient.post({
      url: this.url,
      method: 'post',
      body: params,
    })
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return httpResponse.body
      case HttpStatusCode.unauthorized:
        throw new InvalidCredentialsError()
      default:
        throw new UnexpectedError()
    }
  }
}
