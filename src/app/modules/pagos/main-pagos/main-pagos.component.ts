import { Component, OnInit } from '@angular/core';
import { BreadcrumbComponent } from "@breadcrumb/breadcrumb.component";
import { BC_PAGOS } from "@routing/ListLinks";
import { AccesosAdministrador } from '@shared/admin-permissions/permissions';

@Component({
  selector: 'app-main-pagos',
  templateUrl: './main-pagos.component.html',
  styleUrls: ['./main-pagos.component.scss']
})
export class MainPagosComponent implements OnInit {

  constructor(private accesosAdministrador: AccesosAdministrador) { 
    BreadcrumbComponent.update(BC_PAGOS);
    this.accesosAdministrador.accesoPagos();
  }

  ngOnInit() {
  }

}
