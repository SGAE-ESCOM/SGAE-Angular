import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BreadcrumbComponent } from '@components/breadcrumb/breadcrumb.component';
import { Evaluacion } from '@models/evaluacion/evaluacion';
import { Seccion } from '@models/evaluacion/evaluacion/seccion';
import { Tema } from '@models/evaluacion/evaluacion/tema';
import { Tabla } from '@models/utils/Tabla';
import { AdminEvaluacionesService } from '@services/evaluacion/admin-evaluaciones.service';
import { SeccionesService } from '@services/evaluacion/secciones.service';
import { TemasService } from '@services/evaluacion/temas.service';
import { SweetalertService } from '@services/sweetalert/sweetalert.service';
import { BC_ADMIN_EVALUACION } from '@shared/routing-list/ListLinks';
import { fadeInRight } from '@shared/utils/animations/router.animations';
import { MSJ_ERROR_CONECTAR_SERVIDOR } from '@shared/utils/mensajes';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-main-admin-evaluacion',
  templateUrl: './main-admin-evaluacion.component.html',
  styleUrls: ['./main-admin-evaluacion.component.scss'],
  animations: [fadeInRight()]
})
export class MainAdminEvaluacionComponent implements OnInit {

  columnasEvaluacion: Tabla[] = [{ encabezado: 'Nombre', json: 'nombre' }, { encabezado: 'Temas', json: 'temas', property: 'temas', objectProperty:'nombre' }, { encabezado: 'Acciones', json: 'acciones' }];
  evaluaciones: Evaluacion[] = [];

  secciones:Seccion[] = [];
  temas: Tema[] = [];
  temasAgrupados: any = {};

  constructor(public dialog: MatDialog, private _toastr: ToastrService, private _swal: SweetalertService,
    private _secciones: SeccionesService, private _temas: TemasService, private _evaluaciones: AdminEvaluacionesService) {
    BreadcrumbComponent.update(BC_ADMIN_EVALUACION)
  }

  ngOnInit(): void {
    this.getCatalogos();
  }

  /**************************************** HTTP REST ************************************************/
  async getCatalogos() {
    this._evaluaciones.getAll().subscribe( evaluaciones => this.evaluaciones = evaluaciones );
    this._secciones.get().subscribe( secciones => { 
      this.secciones = secciones
      this._temas.getAll().subscribe( temas => {
        this.temas = temas
        this.temasAgrupados = this.groupBy( this.temas, 'idSeccion' );
        //this.valores[1].push( this.temasAgrupados['ZMZG3v5adGZw7gGoIhzO'][1] )
      } );
    });
    
  }
  
  /**************************************** UTILS ***************************************************/
  private groupBy( list: any[], property: string): any {
    return list.reduce( (prev, current ) => { 
      let key = current[property];
      if( !prev[key] )
        prev[key] = [];
      prev[key].push( current );
      return prev;
    } , {});
  }

  /**************************************** MODALS ***************************************************/
  ///////////////////////// EVALUACION ///////////////////////////////
  modalAgregar() {
    const dialogRef = this.dialog.open(ModalAdminEvaluacion, {
      width: '1024px',
      data: { titulo:'Agregar Evaluacion', opc: 'agregar', evaluacion: new Evaluacion(), secciones: this.secciones, temas: this.temas }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) { }
    });
  }

  modalActualizar(evaluacion: Evaluacion) {
    const dialogRef = this.dialog.open(ModalAdminEvaluacion, {
      width: '1024px',
      data: { titulo: 'Editar Evaluacion', opc: 'actualizar', evaluacion: evaluacion, secciones: this.secciones, temas: this.temas}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) { }
    });
  }

  modalEliminar(evaluacion: Evaluacion) {
    this._swal.confirmarEliminar(`¿Deseas eliminar evaluación '${evaluacion.nombre}'?`, 'No se podrá revertir esta acción')
      .then((result) => {
        if (result.value) {
          this._evaluaciones.delete(evaluacion).then(() => {
            this._swal.eliminadoCorrecto('La evaluación se ha eliminado')
          }).catch(err => this._toastr.error(MSJ_ERROR_CONECTAR_SERVIDOR));
        }
      });
  }

}


/******************************* MODALS COMPONENT ***********************************/
///////////////////////// TEMA ///////////////////////////////
@Component({
  selector: 'modal-admin-evaluacion',
  templateUrl: './modal-admin-evaluacion.component.html',
})
export class ModalAdminEvaluacion {

  constructor(
    public dialogRef: MatDialogRef<ModalAdminEvaluacion>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  cerrar(): void {
    this.dialogRef.close();
  }

  accion(realizado: boolean) {
    this.dialogRef.close(realizado);
  }

}
