import { Component } from '@angular/core';
import {
  PoPageAction,
  PoPageModule,
  PoTableAction,
  PoTableColumn,
  PoTableModule,
} from '@po-ui/ng-components';
import {
  PoPageDynamicSearchLiterals,
  PoPageDynamicSearchModule,
} from '@po-ui/ng-templates';
import { CountryService } from './country.service';

@Component({
  selector: 'app-country',
  standalone: true,
  imports: [PoPageModule, PoPageDynamicSearchModule, PoTableModule],
  templateUrl: './country.component.html',
  styleUrl: './country.component.css',
})
export class CountryComponent {
  //public
  public readonly buttonCreate: Array<PoPageAction> = [
    { label: 'Cadastrar', action: this.countryCreate.bind(this) },
  ];

  public readonly customLiterals: PoPageDynamicSearchLiterals = {
    quickSearchLabel: 'ID',
    searchPlaceholder: 'Pesquise aqui',
  };

  public readonly widthSearch: number = 6;

  public readonly columns: Array<PoTableColumn> = [
    {
      property: 'id',
      type: 'number',
      label: 'Código',
      width: '100px',
    },
    {
      property: 'name',
      type: 'string',
      label: 'País',
    },
  ];
  public actionsTable: Array<PoTableAction> = [
    {
      label: 'Deletar',
      icon: 'po-icon ph ph-trash',
      action: this.actionDelet.bind(this),
    },
    {
      label: 'Editar',
      icon: 'ph ph-pencil-simple',
      action: this.actionEdit.bind(this),
    },
    {
      label: 'Copiar',
      icon: 'ph ph-copy-simple',
      action: this.actionCopy.bind(this),
    },
  ];
  public items: Array<Object> = [];

  //private

  constructor(private countryService: CountryService) {}

  //fn public
  public ngOnInit(): void {
    /*
    this.countryService.getAllCountry().subscribe({
      next: (res) => this.successGetAllCountry(res),
      error: (err) => this.errorGetAllCountry(err),      
    })
    */

    this.countryService.getAllCountry().subscribe((res: Array<Object>) => {
      this.items = res;
    });
  }

  //fn private
  private countryCreate() {
    console.log('Colocar link');
  }
  private actionDelet() {
    console.log('Função de delet');
  }
  private actionEdit() {
    console.log('Função de edit');
  }
  private actionCopy() {
    console.log('Função de copiar');
  }
}
