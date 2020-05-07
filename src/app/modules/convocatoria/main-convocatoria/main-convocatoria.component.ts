import { Component, OnInit } from '@angular/core';
import { BreadcrumbComponent } from "@breadcrumb/breadcrumb.component";
import { BC_CONVOCATORIA } from "@routing/ListLinks";
import { AccesosAdministrador } from '@shared/admin-permissions/permissions';

@Component({
  selector: 'app-main-convocatoria',
  templateUrl: './main-convocatoria.component.html',
  styleUrls: ['./main-convocatoria.component.scss']
})
export class MainConvocatoriaComponent implements OnInit {

  constructor(private accesosAdministrador: AccesosAdministrador) {
    BreadcrumbComponent.update(BC_CONVOCATORIA);
    this.accesosAdministrador.accesoConvocatoria();
  }

  ngOnInit() {
  }

}
