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
  listaRequisitos = [ //DEBUG
    { "id": "1", "nombre": "Nombres", "requerido": true, "tipo": "campo", "subtipo": "texto", "expresionRegular": { "espacios": true, "valor": "a-zá-úA-ZÁ-Ú" } },
    { "id": "2", "nombre": "Nickname", "requerido": true, "tipo": "campo", "subtipo": "texto", "max": 5, "expresionRegular": { "espacios": false, "valor": "a-zá-úA-ZÁ-Ú0-9" } },
    { "id": "3", "nombre": "CURP", "requerido": true, "tipo": "campo", "subtipo": "texto", "min": 18, "max": 18, "expresionRegular": { "espacios": false, "valor": "0-9A-ZÁ-Ú" } },
    { "id": "4", "nombre": "Edad", "requerido": true, "tipo": "campo", "subtipo": "número", "min": 18 },
    { "id": "5", "nombre": "Genero", "requerido": true, "tipo": "seleccion", "subtipo": "unica", "opciones": { "Hombre": "Hombre", "Mujer": "Mujer", "Otro": "Otro" } },
    { "id": "6", "nombre": "Acta de Nacimiento PDF", "requerido": true, "tipo": "archivo", "subtipo": "pdf", "descripcion": "Archivos menores a 215 KB" },
    { "id": "7", "nombre": "Fecha egreso Min-Max", "requerido": true, "tipo": "fecha", "subtipo": "rango", "fechaMin": "2020-01-09T06:00:00.000Z", "fechaMax": "2020-01-23T06:00:00.000Z" },
  ];

  constructor(private _fb: FormBuilder, private toast: ToastrService, private _swal: SweetalertService, private _ads: AdministrarDocumentacionService,
    public dialog: MatDialog) {
    BreadcrumbComponent.update(BC_ADMINISTRAR_DOCUMENTACION);
  }

  ngOnInit() {
    this._ads.getDocumentos().subscribe((documentos: TipoDato[]) => this.documentos.data = documentos); //PRODUCCION
    //this.documentos.data = this.listaRequisitos; // DEBUG
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
      this._ads.saveDocumento(formulario.value).then(() => {
        this.toast.success("Se agrego correctamente")
        this.updateTablaRequerimiento();
      }).catch(err => this.toast.error(err, 'Error'));
    } else {
      this.toast.error("Llena todos los campos requeridos");
    }
  }

  deleteDocumento(elemento: any) {
    console.log(elemento.id)
    this._swal.confirmarEliminar(`¿Deseas eliminar '${elemento.nombre}'?`, 'No se podrá revertir esta acción')
      .then((result) => {
        if (result.value) {
          this._ads.deleteDocumento(elemento.id).then(() => {
            this._swal.eliminadoCorrectamente();
          }).catch(err => this.toast.error(err));
        }
      });
  }

  updateDocumento(documento:TipoDato){
    const dialogRef = this.dialog.open(ModalEditar, {
      width: '1000px',
      data: documento
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed ===> '+ result);
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
      this.toast.error("El formulario no es valido", "Mensaje de prueba");
    } else {
      this.toast.success("El formulario es valido", "Mensaje de prueba");
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
export class ModalEditar {

  constructor(
    public dialogRef: MatDialogRef<ModalEditar>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}