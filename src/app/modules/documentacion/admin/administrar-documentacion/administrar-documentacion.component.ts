import { Component, OnInit, AfterViewInit, ViewChild, Inject } from '@angular/core';
import { BreadcrumbComponent } from "@breadcrumb/breadcrumb.component";
import { BC_ADMINISTRAR_DOCUMENTACION } from "@routing/ListLinks";
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { fadeInDown, fadeInOutDown, fadeInOutLeft } from '@shared/animations/router.animations';
import { TipoDato } from '@models/documentacion/tipo-dato';
import { AdministrarDocumentacionService } from '@services/documentacion/administrar-documentacion.service';
import { SweetalertService } from '@services/sweetalert/sweetalert.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';

@Component({
  selector: 'app-administrar-documentacion',
  templateUrl: './administrar-documentacion.component.html',
  styleUrls: ['./administrar-documentacion.component.scss'],
  animations: [fadeInDown(), fadeInOutDown(), fadeInOutLeft()]
})
export class AdministrarDocumentacionComponent implements OnInit, AfterViewInit {

  //Variables para las tablas
  displayedColumns: string[] = ['nombre', 'requerido', 'tipo', 'subtipo', 'min', 'max', 'tipoArchivo', 'acciones'];
  documentos: MatTableDataSource<TipoDato> = new MatTableDataSource();;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  //Variables para Vista previa
  tituloVistaPrevia = 'Prueba de formulario para aspirante';

  constructor(private _fb: FormBuilder, private toast: ToastrService, private _swal: SweetalertService, private _ads: AdministrarDocumentacionService,
    public dialog: MatDialog) {
    BreadcrumbComponent.update(BC_ADMINISTRAR_DOCUMENTACION);
  }

  ngOnInit() {
    this._ads.getDocumentos().subscribe((documentos: TipoDato[]) => this.documentos.data = documentos); //PRODUCCION
  }

  ngAfterViewInit() {
    this.updateTablaRequerimiento();
  }

  //Eventos
  buscarEnTabla(filterValue: string) {
    this.documentos.filter = filterValue.trim().toLowerCase();
    if (this.documentos.paginator) {
      this.documentos.paginator.firstPage();
    }
  }

  //Peticiones HTTP
  addTipoDato(formulario: FormGroup) {
    if (formulario.valid) { 
      if(formulario.get('opciones').status === 'DISABLED'){
        this.saveRequisito(formulario.value);
      }else{
        if( Object.keys( formulario.get('opciones').value ).length != 0 ){
          this.saveRequisito(formulario.value);
        }else{
          this.toast.error("Debe existir al menos una opción");
        }
      }
    } else {
      this.toast.error("Llena todos los campos requeridos");
    }
  }

  private saveRequisito( requisito ){
    this._ads.saveDocumento( requisito ).then(() => {
      this.toast.success("Se agrego correctamente")
      this.updateTablaRequerimiento();
    }).catch(err => this.toast.error(err, 'Error'));
  }

  deleteDocumento(elemento: any) {
    this._swal.confirmarEliminar(`¿Deseas eliminar '${elemento.nombre}'?`, 'No se podrá revertir esta acción')
      .then((result) => {
        if (result.value) {
          this._ads.deleteDocumento(elemento.id).then(() => {
            this._swal.eliminadoCorrectamente();
          }).catch(err => this.toast.error(err));
        }
      });
  }

  updateDocumento(documento: any) {
    const dialogRef = this.dialog.open(ModalEditarRequisito, {
      width: '1000px',
      data: documento
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this._ads.updateDocumento(documento.id, result).then(data =>
          this.toast.info("El requisito se actualizó exitosamente")
        ).catch(error => this.toast.error(error))
      }
    });
  }

  //Manejo tabla
  private updateTablaRequerimiento(): void {
    this.documentos.paginator = this.paginator;
    this.documentos.sort = this.sort;
  }

  //FormGroup y FormControl getters
  finalizarFormulario(formularioRecivido: FormGroup) {
    if (formularioRecivido.invalid) {
      this.toast.error("El formulario no es válido", "Mensaje de prueba");
    } else {
      this.toast.success("El formulario es válido", "Mensaje de prueba");
    }
  }

  guardarFormulario(formularioRecivido: FormGroup) {
    this.toast.info("Se ha guardado la información", "Mensaje de prueba");
  }

}

@Component({
  selector: 'modal-editar',
  templateUrl: './modal-editar.component.html',
})
export class ModalEditarRequisito {

  constructor(
    public dialogRef: MatDialogRef<ModalEditarRequisito>,
    private _toast: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  enviarForm(requisito: FormGroup) {
    if (requisito.valid)
      this.dialogRef.close(requisito.value);
    else {
      this._toast.error("Llena todos los campos requeridos");
    }
  }

}