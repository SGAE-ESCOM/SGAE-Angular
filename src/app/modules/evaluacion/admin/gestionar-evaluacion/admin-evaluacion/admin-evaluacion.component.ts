import { Component, OnInit } from '@angular/core';
import { BreadcrumbComponent } from '@components/breadcrumb/breadcrumb.component';
import { Tabla } from '@models/utils/Tabla';
import { BC_ADMIN_EVALUACION } from '@shared/routing-list/ListLinks';
import { fadeInRight } from '@shared/utils/animations/router.animations';

@Component({
  selector: 'app-admin-evaluacion',
  templateUrl: './admin-evaluacion.component.html',
  styleUrls: ['./admin-evaluacion.component.scss'],
  animations: [fadeInRight()]
})
export class AdminEvaluacionComponent implements OnInit {

  columnasEvaluacion: Tabla[] = [
    {encabezado:'Nombre', json:'nombre'}, {encabezado:'Grupos', json:'grupos'}, {encabezado:'Temas', json:'temas'}, {encabezado:'Acciones', json: 'acciones'}
  ];
  constructor() {
    BreadcrumbComponent.update(BC_ADMIN_EVALUACION)
  }

  ngOnInit(): void {
  }

}
