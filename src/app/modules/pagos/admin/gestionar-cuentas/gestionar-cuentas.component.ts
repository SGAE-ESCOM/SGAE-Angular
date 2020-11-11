import { Component, OnInit } from '@angular/core';
import { BreadcrumbComponent } from "@breadcrumb/breadcrumb.component";
import { BC_GESTIONAR_CUENTAS } from '@shared/routing-list/ListLinks';

@Component({
  selector: 'app-gestionar-cuentas',
  templateUrl: './gestionar-cuentas.component.html',
  styleUrls: ['./gestionar-cuentas.component.scss']
})
export class GestionarCuentasComponent implements OnInit {

  constructor() { 
    /***************** REVISAR PERMISOS *******************/

    BreadcrumbComponent.update(BC_GESTIONAR_CUENTAS);
  }

  ngOnInit(): void {
  }

}
