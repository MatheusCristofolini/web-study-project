import { LoginComponent } from './login/login.component';
import { UnauthorizedComponent } from './unauthorized.component';

export default [
  {
    path: '',
    Component: UnauthorizedComponent,
    children: [{ path: 'login', loadComponent: () => LoginComponent }],
  },
];
