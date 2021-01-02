import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BreadcrumbComponent } from '@components/breadcrumb/breadcrumb.component';
import { Aplicacion } from '@models/evaluacion/aplicacion';
import { Evaluacion } from '@models/evaluacion/evaluacion';
import { Grupo } from '@models/evaluacion/Grupo';
import { AuthService } from '@services/auth.service';
import { AdminEvaluacionesService } from '@services/evaluacion/admin-evaluaciones.service';
import { AplicacionService } from '@services/evaluacion/aplicacion.service';
import { GruposService } from '@services/evaluacion/grupos.service';
import { SweetalertService } from '@services/sweetalert/sweetalert.service';
import { BC_ADMIN_APLICACION } from '@shared/routing-list/ListLinks';
import { fadeInRight } from '@shared/utils/animations/router.animations';
import { momentJS } from '@shared/utils/traduccion/moment';
import { groupByOnly } from '@shared/utils/utils-grupos';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-main-aplicacion',
  templateUrl: './main-aplicacion.component.html',
  styleUrls: ['./main-aplicacion.component.scss'],
  animations: [fadeInRight()]
})
export class MainAplicacionComponent implements OnInit {

  grupos: Grupo[];
  evaluaciones: Evaluacion[];
  aplicaciones: Aplicacion[];
  
  //ParserObject
  gruposObj: any = {};
  evaluacionesObj: any = {};

  constructor(private _auth: AuthService, private dialog: MatDialog,
    private _swal: SweetalertService, private _toastr: ToastrService,
    private _evaluacion:AdminEvaluacionesService, private _grupos: GruposService, private _aplicaciones: AplicacionService) {
    BreadcrumbComponent.update(BC_ADMIN_APLICACION)
  }

  ngOnInit(): void {
    this.getCatalogos();
  }

  /********************* HTTP ***************************/
  async getCatalogos() {
    await this.getGrupos();
    await this.getEvaluaciones();
    await this.getAplicaciones();
  }

  async getGrupos(){
    await this._grupos.get().subscribe( grupos => { 
      this.grupos = grupos;
      this.gruposObj = groupByOnly(this.grupos, 'id');
    });
  }

  async getEvaluaciones(){
    this._evaluacion.getAll().subscribe( evaluaciones => {
      this.evaluaciones = evaluaciones;
      this.evaluaciones.forEach( evaluacion => {
        evaluacion.total = evaluacion.temas.reduce( (prev, current ) => { return current.total + prev }, 0 );
      });
      this.evaluacionesObj = groupByOnly(this.evaluaciones, 'id')
    });
  }

  async getAplicaciones(){
    this._aplicaciones.getAll().subscribe( aplicaciones => { 
      this.aplicaciones = aplicaciones;
      this.aplicaciones.forEach( aplicacion => {
        aplicacion.fechasAplicacionArray = Object.entries( aplicacion.fechasAplicacion );
        aplicacion.fechasAplicacionArray.forEach( ([key, fechaAplicacion ]) => { 
          fechaAplicacion.fechaInicioF = momentJS(fechaAplicacion.fechaInicio).format('Do MMMM YYYY');
          fechaAplicacion.fechaTerminoF = momentJS(fechaAplicacion.fechaTermino).format('Do MMMM YYYY');
        });
      })
    });
  }

  /******************************* MODALS ***********************************/
  onAgregar() {
    const dialogRef = this.dialog.open(ModalAplicacion, {
      width: '1100px',
      data: { opc: 'agregar', titulo: 'Agregar', aplicacion: new Aplicacion(), grupos: this.grupos, evaluaciones: this.evaluaciones }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        /*this._ads.updateDocumento(documento.id, result).then(data =>
          this.toast.info("El requisito se actualizó exitosamente")
        ).catch(error => this.toast.error(error))*/
      }
    });
  }

  onActualizar(aplicacion: Aplicacion) {
    const dialogRef = this.dialog.open(ModalAplicacion, {
      width: '1100px',
      data: { opc: 'actualizar', titulo: 'Editar', aplicacion: aplicacion, grupos: this.grupos, evaluaciones: this.evaluaciones }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        /*this._ads.updateDocumento(documento.id, result).then(data =>
          this.toast.info("El requisito se actualizó exitosamente")
        ).catch(error => this.toast.error(error))*/
      }
    });
  }

  onEliminar(aplicacion: Aplicacion) {
    this._swal.confirmarEliminar(`¿Deseas eliminar la aplicación '${aplicacion.nombre}'?`, 'No se podrá revertir esta acción')
      .then((result) => {
        if (result.value) {
          this._aplicaciones.delete(aplicacion).then(() => {
            this._swal.eliminadoCorrecto('El grupo se ha eliminado');
          }).catch(err => this._toastr.error(err));
        }
      });
  }


}


/******************************* MODALS ***********************************/
@Component({
  selector: 'modal-aplicacion',
  templateUrl: './modal-aplicacion.component.html',
})
export class ModalAplicacion {

  constructor(
    public dialogRef: MatDialogRef<ModalAplicacion>,
    private _toast: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  cerrar(): void {
    this.dialogRef.close();
  }

  accion(realizado: boolean) {
    this.dialogRef.close(realizado);
  }

}