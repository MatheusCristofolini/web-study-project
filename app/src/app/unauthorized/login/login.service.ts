import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PoNotificationService } from '@po-ui/ng-components';
import { LoginRequest } from './login-request';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private readonly url = '/api/authentication';
  private token = '';

  constructor(
    private readonly http: HttpClient,
    private readonly poNotification: PoNotificationService
  ) {}

  public singIn(body: LoginRequest) {
    return this.http.post(this.url + '/sing-in', body);
  }

  public refreshToken(refreshToken: any) {
    return this.http.post(this.url + '/refresh-tokens', refreshToken);
  }
}
