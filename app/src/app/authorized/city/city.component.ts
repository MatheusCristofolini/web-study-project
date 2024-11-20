import { Component } from '@angular/core';
import { PoPageModule } from '@po-ui/ng-components';

@Component({
  selector: 'app-city',
  standalone: true,
  imports: [PoPageModule],
  templateUrl: './city.component.html',
  styleUrl: './city.component.css',
})
export class CityComponent {}
