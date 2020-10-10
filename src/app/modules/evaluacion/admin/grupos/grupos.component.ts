import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BreadcrumbComponent } from '@components/breadcrumb/breadcrumb.component';
import { Grupo } from '@models/evaluacion/Grupo';
import { Tabla } from '@models/utils/Tabla';
import { AuthService } from '@services/auth.service';
import { BC_GESTIONAR_GRUPOS } from '@shared/routing-list/ListLinks';

@Component({
  selector: 'app-grupos',
  templateUrl: './grupos.component.html',
  styleUrls: ['./grupos.component.scss']
})
export class GruposComponent implements OnInit {

  nombreGrupo: FormControl;
  columnas: Tabla[] = [ {encabezado:'Nombre', json:'nombre'}, {encabezado: 'Acciones', json:'acciones'}];
  grupos: Grupo[] = [ { id:"1", nombre: 'Ingeniería en Sistemas'}, {nombre:'Inteligencia Artificial'} ];
  
  constructor(private usuario: AuthService) {
    BreadcrumbComponent.update(BC_GESTIONAR_GRUPOS);
  }

  ngOnInit(): void {
  }

  /******************************* MODALS ***********************************/
  modalGuardar(){
    console.log('Press guardar')
  }

  modalActualizar(grupo: Grupo){
    console.log('Press actualizar')
    console.log(grupo)
  }

  modalEliminar(grupo: Grupo){
    console.log('Press eliminar')
    console.log(grupo)
  }
}
