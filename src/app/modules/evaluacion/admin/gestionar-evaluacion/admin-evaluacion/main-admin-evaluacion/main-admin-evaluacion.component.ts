import { Component, OnInit } from '@angular/core';
import { BreadcrumbComponent } from '@components/breadcrumb/breadcrumb.component';
import { Evaluacion } from '@models/evaluacion/Evaluacion';
import { Tabla } from '@models/utils/Tabla';
import { BC_ADMIN_EVALUACION } from '@shared/routing-list/ListLinks';
import { fadeInRight } from '@shared/utils/animations/router.animations';

@Component({
  selector: 'app-main-admin-evaluacion',
  templateUrl: './main-admin-evaluacion.component.html',
  styleUrls: ['./main-admin-evaluacion.component.scss'],
  animations: [fadeInRight()]
})
export class MainAdminEvaluacionComponent implements OnInit {

  columnasEvaluacion: Tabla[] = [
    { encabezado: 'Nombre', json: 'nombre' }, { encabezado: 'Grupos', json: 'grupos' }, { encabezado: 'Temas', json: 'temas' }, { encabezado: 'Acciones', json: 'acciones' }
  ];

  evaluaciones: Evaluacion[] = [
    { nombre: 'Examen A', temas: [], grupose: [] }
  ];

  constructor() {
    BreadcrumbComponent.update(BC_ADMIN_EVALUACION)
  }

  ngOnInit(): void {
  }

}
