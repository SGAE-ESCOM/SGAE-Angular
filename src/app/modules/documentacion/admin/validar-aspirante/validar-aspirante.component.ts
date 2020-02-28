import { Component, OnInit, ViewChild, AfterViewInit, Inject } from '@angular/core';
import { BreadcrumbComponent } from '@shared/breadcrumb/breadcrumb.component';
import { BC_VALIDAR_DOC_ASPIRANTE } from '@shared/routing-list/ListLinks';
import { ActivatedRoute, Router } from "@angular/router";
import { MatPaginator, MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { SweetalertService } from '@services/sweetalert/sweetalert.service';
import { UsuarioInterface } from '@models/persona/usuario';
import { ValidarDocumentacionService } from '@services/documentacion/validar-documentacion.service';
import { UsuarioService } from '@services/usuario/usuario.service';

@Component({
  selector: 'app-validar-aspirante',
  templateUrl: './validar-aspirante.component.html',
  styleUrls: ['./validar-aspirante.component.scss']
})
export class ValidarAspiranteComponent implements OnInit, AfterViewInit {

  //Variables para las tablas
  requisitosTabla;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  //Variables de logica validacion
  requisitosAspirante;
  requisitosValidados: any[] = [];
  private usuario: UsuarioInterface;

  constructor(public dialog: MatDialog,
    private _subirDocService: ValidarDocumentacionService, private _personaService: UsuarioService,
    private route: ActivatedRoute, private router: Router,
    private _toast: ToastrService, private _swal: SweetalertService ) {
    BreadcrumbComponent.update(BC_VALIDAR_DOC_ASPIRANTE);
    this.usuario = { id: this.route.snapshot.paramMap.get("id") };
  }

  ngOnInit(): void {
    this._subirDocService.getDocumentacion(this.usuario).subscribe(requisitos => { this.formatearRequisitos(requisitos) }); //PRODUCCION
  }

  ngAfterViewInit() {
    //this.updateTablaUsuarios();
  }

  //HTTP
  onEnviarCorrecciones(){
    this._toast.success("Se han enviado las correcciones");
    console.log(this.usuario);
    console.log(this.requisitosAspirante);
    this._subirDocService.updateDocumentacion(this.usuario, this.requisitosAspirante).then( response => {
      this._personaService.updateEstadoDocumentacion(this.usuario, 'editando');
      this.router.navigate([BC_VALIDAR_DOC_ASPIRANTE.links[2].url]);
    }).catch( err => this._toast.error("Ha ocurrido un error"));
  }

  onFinalizar() {
    let todosValidos = true;
    for (let i = 0; i < this.requisitosValidados.length; i++) {
      if (todosValidos && this.requisitosValidados[i][1].valido)
        continue;
      else {
        todosValidos = false;
        break
      }
    }
    if(todosValidos){
      this._swal.confirmarFinalizar("¿Finalizar validación de aspirante?", "No podras cambiar el estado del aspirante después.")
      .then( valor => {
        //console.log(BC_VALIDAR_DOC_ASPIRANTE.links[2].url);
        this.router.navigate([BC_VALIDAR_DOC_ASPIRANTE.links[2].url]);
      }).catch( err => this._toast.error("Ha ocurrido un error"));
    }else{
      this._toast.error("Todos los requisitos deben ser válidos para poder finalizar");
    }
  }

  //Logica del frontend
  private formatearRequisitos(requisitosSinFormato) {
    this.requisitosAspirante = requisitosSinFormato;
    this.requisitosValidados = Object.entries(this.requisitosAspirante);
    this.requisitosTabla = this.requisitosValidados.map(([requisito, json]: any) => {
      let requistoAux = { nombre: requisito, valor: json.valor, tipo: 'texto' };
      if (typeof requistoAux.valor == 'object') {
        requistoAux.tipo = 'archivo';
      }
      return requistoAux;
    });
  }

  abrirArchivo(archivo) {
    
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

}