import { Component } from '@angular/core';
import { PoPageModule } from '@po-ui/ng-components';

@Component({
  selector: 'app-state',
  standalone: true,
  imports: [PoPageModule],
  templateUrl: './state.component.html',
  styleUrl: './state.component.css',
})
export class StateComponent {}
