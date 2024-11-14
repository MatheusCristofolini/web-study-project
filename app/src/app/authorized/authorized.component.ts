import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import {
  PoMenuItem,
  PoMenuModule,
  PoPageModule,
  PoToolbarModule,
} from '@po-ui/ng-components';

@Component({
  selector: 'app-authorized',
  standalone: true,
  imports: [
    CommonModule,
    PoToolbarModule,
    PoMenuModule,
    PoPageModule,
    RouterOutlet,
  ],
  templateUrl: './authorized.component.html',
  styleUrl: './authorized.component.css',
})
export class AuthorizedComponent {
  public readonly menus: Array<PoMenuItem> = [
    {
      label: 'País',
      link: '/pais',
      action: this.navigateRouter.bind(this),
    },
    {
      label: 'Estado',
      link: '/estado',
      action: this.navigateRouter.bind(this),
    },
    {
      label: 'Cidade',
      link: '/cidade',
      action: this.navigateRouter.bind(this),
    },
  ];

  constructor(private readonly router: Router) {}

  private navigateRouter(menu: PoMenuItem): void {
    console.log(menu.link);

    this.router.navigateByUrl(menu.link!);
  }
}
