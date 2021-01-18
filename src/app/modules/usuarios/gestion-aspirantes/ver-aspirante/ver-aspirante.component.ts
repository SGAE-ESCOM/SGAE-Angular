import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { BreadcrumbComponent } from '@components/breadcrumb/breadcrumb.component';
import { UsuarioInterface } from '@models/persona/usuario';
import { AuthService } from '@services/auth.service';
import { ValidarDocumentacionService } from '@services/documentacion/validar-documentacion.service';
import { SweetalertService } from '@services/sweetalert/sweetalert.service';
import { GESTION_USUARIOS, sinAcceso, comprobarPermisos } from '@shared/admin-permissions/permissions';
import { BC_USUARIOS, BC_VER_ASPIRANTE } from '@shared/routing-list/ListLinks';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-ver-aspirante',
  templateUrl: './ver-aspirante.component.html',
  styleUrls: ['./ver-aspirante.component.scss']
})
export class VerAspiranteComponent implements OnInit {

  //Variables para las tablas
  documentacionTabla;
  emptyDocs = true;
  docHeaderDesc = "Sin documentación.";

  usuario: UsuarioInterface;
  id = "vacio";

  constructor(private _router: Router, private _toast: ToastrService, private _authService: AuthService, private _swal: SweetalertService, 
        private _subirDocService: ValidarDocumentacionService, public dialog: MatDialog) {
    let usuario = this._authService.getUsuarioC();
    BreadcrumbComponent.update(BC_USUARIOS);
    //Comprobar Permisos
    if(usuario.rol != 'root' && !comprobarPermisos(usuario, GESTION_USUARIOS, _router)) sinAcceso(_router);
    BreadcrumbComponent.update(BC_VER_ASPIRANTE);
    //Obtener Id usuario
    const navigation = this._router.getCurrentNavigation();
    if( navigation.extras.state ){
      this.id = JSON.parse(navigation.extras.state.userId);
      this.getUsuario();
    }else{
      this._toast.error("Hubo un error al cargar información");
      this._router.navigate(['/app/usuarios/gestion-aspirantes/revisar-aspirantes']);
    }
  }

  ngOnInit(): void {
  }

  getUsuario() {
    this._authService.isAuth().subscribe(auth => {
      if (auth) {
        this._authService.findUsuario(this.id).subscribe((usuario: UsuarioInterface) => {
          if (usuario) {
            this.usuario = usuario;
            this._subirDocService.getDocumentacion(this.usuario).subscribe(documentacion => { 
              if(typeof documentacion !== 'undefined'){
                this.formatearDocumentacion(documentacion);
                this.emptyDocs = false;
                this.docHeaderDesc = "Documentación subida por el aspirante.";
              }
              
            });
          }
        }, error => {
          this._toast.error("Hubo un error al cargar información");
          this._router.navigate(['/app/usuarios/gestion-aspirantes']);
        });
      } 
    });
  }

  formatearDocumentacion(documentacionSinFormato){
    let requisitosAspirante = documentacionSinFormato.documentacion;
    let requisitosValidados = Object.entries(requisitosAspirante);
    this.documentacionTabla = requisitosValidados.map(([requisito, json]: any) => {
      let requistoAux = { nombre: requisito, valor: json.valor, tipo: 'texto' };
      if (typeof requistoAux.valor == 'object') {
        requistoAux.tipo = 'archivo';
      }
      return requistoAux;
    });
  }

  abrirArchivo(archivo) {
    const dialogRef = this.dialog.open(ModalVerDocumentoUsuario, {
      width: '1000px',
      data: archivo
    });
    dialogRef.afterClosed().subscribe(result => {});
  }
}

@Component({
  selector: 'modal-ver-documento-usuario',
  templateUrl: './modal-documento.component.html',
})
export class ModalVerDocumentoUsuario {

  constructor(
    public dialogRef: MatDialogRef<ModalVerDocumentoUsuario>,
    public sanitizer: DomSanitizer,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}