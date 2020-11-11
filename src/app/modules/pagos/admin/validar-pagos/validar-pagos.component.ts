import { Component, OnInit } from '@angular/core';
import { BreadcrumbComponent } from '@components/breadcrumb/breadcrumb.component';
import { BC_VALIDAR_PAGOS } from '@shared/routing-list/ListLinks';

@Component({
  selector: 'app-validar-pagos',
  templateUrl: './validar-pagos.component.html',
  styleUrls: ['./validar-pagos.component.scss']
})
export class ValidarPagosComponent implements OnInit {

  constructor() { 
    /***************** REVISAR PERMISOS *******************/

    BreadcrumbComponent.update(BC_VALIDAR_PAGOS);
  }

  ngOnInit(): void {
  }

}
