import { Routes } from '@angular/router';
import { AuthorizedComponent } from './authorized.component';
import { CityComponent } from './city/city.component';
import { CountryComponent } from './country/country.component';
import { StateComponent } from './state/state.component';

export default [
  {
    path: '',
    component: AuthorizedComponent,
    children: [
      { path: 'pais', loadComponent: () => CountryComponent },
      { path: 'estado', loadComponent: () => StateComponent },
      { path: 'cidade', loadComponent: () => CityComponent },
    ],
  },
] as Routes;
