import { Component, OnInit, ViewChild, AfterViewInit, Inject } from '@angular/core';
import { BreadcrumbComponent } from '@shared/breadcrumb/breadcrumb.component';
import { BC_VALIDAR_DOC_ASPIRANTE } from '@shared/routing-list/ListLinks';
import { ActivatedRoute } from "@angular/router";
import { MatPaginator, MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { SubirDocumentacionService } from '@services/documentacion/subir-documentacion.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-validar-aspirante',
  templateUrl: './validar-aspirante.component.html',
  styleUrls: ['./validar-aspirante.component.scss']
})
export class ValidarAspiranteComponent implements OnInit, AfterViewInit {

  private usuario;
  //Variables para las tablas
  requisitosTabla;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  //Variables de logica validacion
  requisitosAspirante;

  //Varibale DEBUG
  listaUsuarios: any[] = [ //DEBUG
    { "id": "1", "nombres": "Gustavo Andres", "apellidos": "Lopez Sanchez", "estado": "SIN_REVISION" },
    { "id": "2", "nombres": "Aiko Dallane", "apellidos": "López Rivera", "estado": "SIN_REVISION" },
    { "id": "3", "nombres": "Edgar", "apellidos": "Flores Altamirano", "estado": "SIN_REVISION" },
    { "id": "4", "nombres": "Christian Andres", "apellidos": "Cervantes Moreno", "estado": "SIN_REVISION" },
  ];

  constructor(public dialog: MatDialog, private _subirDocService: SubirDocumentacionService, private route: ActivatedRoute) {
    BreadcrumbComponent.update(BC_VALIDAR_DOC_ASPIRANTE);
    //this.usuario = { id: 'DlYkWcPFFfX8ZXpPdv1sFrtGRRv2' };
    this.usuario = {id: this.route.snapshot.paramMap.get("id")};
    console.log(this.usuario);
  }

  ngOnInit(): void {
    //this._ads.getDocumentos().subscribe( (documentos:TipoDato[]) => this.documentos.data = documentos ); //PRODUCCION
    this._subirDocService.getDocumentacion(this.usuario).subscribe(requisitos => { this.formatearRequisitos(requisitos) }); //PRODUCCION
    //this.requisitos.data = this.listaUsuarios; // DEBUG
  }

  ngAfterViewInit() {
    //this.updateTablaUsuarios();
  }

  private formatearRequisitos(requisitosSinFormato) {
    this.requisitosAspirante = requisitosSinFormato;
    this.requisitosTabla = Object.entries(requisitosSinFormato).map(([requisito, json]: any) => {
      let requistoAux = { nombre: requisito, valor: json.valor, valido: json.valido, tipo: 'texto' };
      if (typeof requistoAux.valor == 'object') {
        requistoAux.tipo = 'archivo';
        //requistoAux['url'] = requistoAux.valor.archivo;
        //requistoAux.valor = requistoAux.valor.nombre;
      }
      return requistoAux;
    });
  }

  abrirArchivo(archivo) {
    console.log(archivo);
    const dialogRef = this.dialog.open(ModalVerDocumentoRequisito, {
      width: '1000px',
      data: archivo
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Cerrado')
    });
  }

  //
  private updateTablaUsuarios(): void {
    this.requisitosTabla = this.paginator;
  }
}

@Component({
  selector: 'modal-editar',
  templateUrl: './modal-documento.component.html',
})
export class ModalVerDocumentoRequisito {

  constructor(
    public dialogRef: MatDialogRef<ModalVerDocumentoRequisito>,
    public sanitizer: DomSanitizer,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  enviarForm() {

  }

}