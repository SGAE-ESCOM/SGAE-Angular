import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BreadcrumbComponent } from '@components/breadcrumb/breadcrumb.component';
import { Grupo } from '@models/evaluacion/Grupo';
import { Tabla } from '@models/utils/Tabla';
import { GruposService } from '@services/evaluacion/grupos.service';
import { SweetalertService } from '@services/sweetalert/sweetalert.service';
import { UsuarioService } from '@services/usuario/usuario.service';
import { BC_GESTIONAR_GRUPOS } from '@shared/routing-list/ListLinks';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-grupos',
  templateUrl: './grupos.component.html',
  styleUrls: ['./grupos.component.scss']
})
export class GruposComponent implements OnInit {

  nombreGrupo: FormControl;
  columnas: Tabla[] = [{ encabezado: 'Nombre', json: 'nombre' }, { encabezado: 'Acciones', json: 'acciones' }];
  grupos: Grupo[] = [];

  constructor(public dialog: MatDialog, private _grupos: GruposService, private _usuariosService: UsuarioService,
    private _swal: SweetalertService, private _toastr:ToastrService) {
    BreadcrumbComponent.update(BC_GESTIONAR_GRUPOS);
  }

  ngOnInit(): void {
    this._grupos.get().subscribe(grupos => { this.grupos = grupos }).remove;
  }

  modalGuardar() {
    const dialogRef = this.dialog.open(ModalGrupos, {
      width: '600px',
      data: { opc: 'agregar', titulo:'Agregar' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {}
    });
  }

  modalActualizar(grupo: Grupo) {
    const dialogRef = this.dialog.open(ModalGrupos, {
      width: '600px',
      data: { opc: 'actualizar', grupo: grupo, titulo:'Editar' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {}
    });
  }

  modalEliminar(grupo: Grupo) {
    this._swal.confirmarEliminar(`¿Deseas eliminar el grupo '${grupo.nombre}'?`, 'No se podrá revertir esta acción')
    .then((result) => {
      if (result.value) {
        
        this._grupos.delete(grupo).then(() => {
          this._swal.eliminadoCorrecto('El grupo se ha eliminado');
        }).catch(err => this._toastr.error(err));
      }
    });
  }
}

/******************************* MODALS ***********************************/
@Component({
  selector: 'modal-grupos',
  templateUrl: './modal-grupos.component.html',
})
export class ModalGrupos {

  constructor(
    public dialogRef: MatDialogRef<ModalGrupos>,
    private _toast: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  accion(realizado: boolean) {
    this.dialogRef.close(realizado);
  }

}