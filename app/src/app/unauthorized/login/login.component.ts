import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PoNotificationService } from '@po-ui/ng-components';
import {
  PoPageLoginAuthenticationType,
  PoPageLoginModule,
} from '@po-ui/ng-templates';
import { LoginRequest } from './login-request';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [PoPageLoginModule],

  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  public readonly authenticationType = PoPageLoginAuthenticationType.Bearer;
  public readonly urlSingIn = '/api/authentication/sing-in';
  public loading: boolean = false;
  public readonly newRegister = 'https://po-ui.io/documentation/po-page-login';

  private readonly accessToken = 'acess_token';
  private readonly refreshToken = 'refresh_token';

  constructor(
    private readonly router: Router,
    private readonly loginService: LoginService,
    private readonly poNotification: PoNotificationService
  ) {}

  public onLogin(event: any): void {
    const loginData = event;

    this.loading = true;

    const body: LoginRequest = {
      login: loginData.login,
      password: loginData.password,
    };

    this.loginService.singIn(body).subscribe({
      next: (res: any) => {
        //console.log(res.accessToken);
        sessionStorage.setItem(this.accessToken, res.accessToken);
        sessionStorage.setItem(this.refreshToken, res.refreshToken);

        this.onSingIn(event);
      },
      error: (err) => {
        this.loading = false;

        console.error('Erro no login: ', err.error.message);
        this.poNotification.error(err.error.message);
      },
    });
  }

  public onSingIn(event: any): void {
    this.router.navigateByUrl('/pais');
  }
}
