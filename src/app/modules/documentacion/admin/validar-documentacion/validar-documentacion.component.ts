import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { BreadcrumbComponent } from '@breadcrumb/breadcrumb.component';
import { BC_VALIDAR_DOCUMENTACION, BC_DOCUMENTACION } from '@shared/routing-list/ListLinks';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { UsuarioService } from '@services/usuario/usuario.service';
import { ToastrService } from 'ngx-toastr';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { comprobarPermisos, GESTION_DOC } from '@shared/admin-permissions/permissions';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-validar-documentacion',
  templateUrl: './validar-documentacion.component.html',
  styleUrls: ['./validar-documentacion.component.scss']
})
export class ValidarDocumentacionComponent implements OnInit, AfterViewInit {

  //Variables para las tablas
  displayedColumns: string[] = ['nombres', 'apellidos', 'estado', 'acciones'];
  usuarios: MatTableDataSource<any> = new MatTableDataSource();;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  filtros: any[] = [
    { nombre: "Sin revisión", valor: "revision" },
    { nombre: "Pendiente de corrección", valor: "correccion" },
    { nombre: "Validado", valor: "validado" }
  ]
  fcFiltro = new FormControl(this.filtros[0].valor);
  
  constructor(private _router:Router, private _usuarioService: UsuarioService, private _toast:ToastrService, 
        private _authServices: AuthService) { 
    let usuario = this._authServices.getUsuarioC();
    BreadcrumbComponent.update(BC_DOCUMENTACION);
    if(comprobarPermisos(usuario, GESTION_DOC, _router)){
      BreadcrumbComponent.update(BC_VALIDAR_DOCUMENTACION);
    }
  }

  ngOnInit() {
    //this.usuarios.data = this.listaUsuarios; // DEBUG
    this._usuarioService.getAspirantesParaRevision().then((querySnapshot) => {
      let usuarios = [];
      querySnapshot.forEach((doc) => {
        usuarios.push(doc.data());
      });
      this.usuarios.data = usuarios;
    }).catch( err =>  this.mensajeError());
  }

  ngAfterViewInit() {
    this.updateTablaUsuarios();
  }

  private updateTablaUsuarios(): void {
    this.usuarios.paginator = this.paginator;
    this.usuarios.sort = this.sort;
  }

  //Eventos
  onChangeFiltroUsuario(filtro) {
    switch (filtro) {
      case this.filtros[0].valor:
        this._usuarioService.getAspirantesParaRevision().then((querySnapshot) => {
          let usuarios = [];
          querySnapshot.forEach((doc) => {
            usuarios.push(doc.data());
          });
          this.definirUsuarios(usuarios);
        }).catch( err =>  this.mensajeError());
        break;
      case this.filtros[1].valor:
        this._usuarioService.getAspirantesEnCorreccion().then((querySnapshot) => {
          let usuarios = [];
          querySnapshot.forEach((doc) => {
            usuarios.push(doc.data());
          });
          this.definirUsuarios(usuarios);
        }).catch( err =>  this.mensajeError());
        break;
      case this.filtros[2].valor:  
        this._usuarioService.getAspirantesValidados().then((querySnapshot) => {
          let usuarios = [];
          querySnapshot.forEach((doc) => {
            usuarios.push(doc.data());
          });
          this.definirUsuarios(usuarios);
        }).catch( err =>  this.mensajeError());
        break;
      default:
        break;
    }
    this.updateTablaUsuarios();
  }

  buscarUsuario(filterValue: string) {
    this.usuarios.filter = filterValue.trim().toLowerCase();
    if (this.usuarios.paginator) {
      this.usuarios.paginator.firstPage();
    }
  }

  goto( infoUsuario: any ){
    this._router.navigate(['/app/documentacion/validar/aspirante'], { state: { usuario: JSON.stringify(infoUsuario) } });
  }

  private mensajeError():void{
    this._toast.error("Hubo un error al cargar información");
  }

  private definirUsuarios(usuarios: any[]): void{
    if(!usuarios.length)
      this._toast.info("No se han encontrado resultados");
    this.usuarios.data = usuarios;
  }

}
