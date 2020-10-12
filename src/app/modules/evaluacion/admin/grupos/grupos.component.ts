import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BreadcrumbComponent } from '@components/breadcrumb/breadcrumb.component';
import { Grupo } from '@models/evaluacion/Grupo';
import { Tabla } from '@models/utils/Tabla';
import { AuthService } from '@services/auth.service';
import { BC_GESTIONAR_GRUPOS } from '@shared/routing-list/ListLinks';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-grupos',
  templateUrl: './grupos.component.html',
  styleUrls: ['./grupos.component.scss']
})
export class GruposComponent implements OnInit {

  formulario: any[] = [{ "id": "XCBc0kvetdml1ZwUZSPx", "subtipo": "texto", "tipo": "campo", "num": 0, "expresionRegular": { "espacios": true, "valor": "a-zá-úA-ZÁ-Ú" }, "nombre": "Nombre Completo", "requerido": true }, { "id": "zTIytqXIAxhJM04vYvYf", "min": 18, "requerido": true, "num": 1, "nombre": "Edad", "subtipo": "número", "tipo": "campo" }, { "id": "tt3PDI7TUANyOlKKM9QK", "descripcion": "Sin tachaduras", "num": 2, "tipo": "archivo", "subtipo": "pdf", "nombre": "CURP", "requerido": true }, { "id": "0P9GYf9Ej9x1wYCtIUBl", "num": 3, "subtipo": "unica", "opciones": { "Masculino": "Masculino", "Femenino": "Femenino" }, "requerido": false, "tipo": "seleccion", "nombre": "Género" }];

  nombreGrupo: FormControl;
  columnas: Tabla[] = [{ encabezado: 'Nombre', json: 'nombre' }, { encabezado: 'Acciones', json: 'acciones' }];
  grupos: Grupo[] = [{ id: "1", nombre: 'Ingeniería en Sistemas' }, { nombre: 'Inteligencia Artificial' }];

  constructor(private usuario: AuthService, public dialog: MatDialog) {
    BreadcrumbComponent.update(BC_GESTIONAR_GRUPOS);
  }

  ngOnInit(): void {
  }

  modalGuardar() {
    const dialogRef = this.dialog.open(ModalGrupos, {
      width: '600px',
      data: { isAgregar: true }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        /*this._ads.updateDocumento(documento.id, result).then(data =>
          this.toast.info("El requisito se actualizó exitosamente")
        ).catch(error => this.toast.error(error))*/
      }
    });
  }

  modalActualizar(grupo: Grupo) {
    console.log('Press actualizar')
    console.log(grupo)
  }

  modalEliminar(grupo: Grupo) {
    console.log('Press eliminar')
    console.log(grupo)
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

  enviarForm(repuesta) {
    /*if (requisito.valid)
      this.dialogRef.close(requisito.value);
    else {
      this._toast.error("Llena todos los campos requeridos");
    }*/
  }

}