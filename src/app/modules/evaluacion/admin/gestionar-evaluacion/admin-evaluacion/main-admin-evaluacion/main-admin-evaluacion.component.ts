import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BreadcrumbComponent } from '@components/breadcrumb/breadcrumb.component';
import { Evaluacion } from '@models/evaluacion/Evaluacion';
import { Tabla } from '@models/utils/Tabla';
import { SweetalertService } from '@services/sweetalert/sweetalert.service';
import { BC_ADMIN_EVALUACION } from '@shared/routing-list/ListLinks';
import { fadeInRight } from '@shared/utils/animations/router.animations';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-main-admin-evaluacion',
  templateUrl: './main-admin-evaluacion.component.html',
  styleUrls: ['./main-admin-evaluacion.component.scss'],
  animations: [fadeInRight()]
})
export class MainAdminEvaluacionComponent implements OnInit {

  columnasEvaluacion: Tabla[] = [
    { encabezado: 'Nombre', json: 'nombre' }, { encabezado: 'Temas', json: 'temas' }, { encabezado: 'Acciones', json: 'acciones' }
  ];

  evaluaciones: Evaluacion[] = [
    { nombre: 'Examen A', temas: [], grupose: [] }
  ];

  constructor(public dialog:MatDialog, private _toastr:ToastrService, private _swal:SweetalertService) {
    BreadcrumbComponent.update(BC_ADMIN_EVALUACION)
  }

  ngOnInit(): void {
  }

  /**************************************** MODALS *************************************/
  ///////////////////////// TEMA ///////////////////////////////
  modalAgregar() {
    const dialogRef = this.dialog.open(ModalAdminEvaluacion, {
      width: '1024px',
      data: { opc: 'agregar', evaluacion: new Evaluacion()}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) { }
    });
  }

  modalActualizar(evaluacion: Evaluacion) {
    const dialogRef = this.dialog.open(ModalAdminEvaluacion, {
      width: '1024px',
      data: { opc: 'actualizar', evaluacion: evaluacion }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) { }
    });
  }

  modalEliminar(evaluacion: Evaluacion) {
    this._swal.confirmarEliminar(`¿Deseas eliminar tema '${evaluacion.nombre}'?`, 'No se podrá revertir esta acción')
      .then((result) => {
        if (result.value) {
          /* this._temas.delete(tema).then(() => {
            this._swal.eliminadoCorrecto('El tema se ha eliminado')
          }).catch(err => this._toastr.error(err)); */
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
