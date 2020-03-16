import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { BreadcrumbComponent } from '@shared/breadcrumb/breadcrumb.component';
import { BC_VALIDAR_DOCUMENTACION } from '@shared/routing-list/ListLinks';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { UsuarioService } from '@services/usuario/usuario.service';
import { ToastrService } from 'ngx-toastr';
import { FormControl } from '@angular/forms';

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

  //Varibale DEBUG
  listaUsuarios: any[] = [ //DEBUG
    { "id": "1", "nombres": "Gustavo Andres", "apellidos": "Lopez Sanchez", "estado": "SIN_REVISION" },
    { "id": "2", "nombres": "Aiko Dallane", "apellidos": "López Rivera", "estado": "SIN_REVISION" },
    { "id": "3", "nombres": "Edgar", "apellidos": "Flores Altamirano", "estado": "SIN_REVISION" },
    { "id": "4", "nombres": "Christian Andres", "apellidos": "Cervantes Moreno", "estado": "SIN_REVISION" },
  ];

  filtros: any[] = [
    { nombre: "Sin revisión", valor: "revision" },
    { nombre: "Pendiente de corrección", valor: "correccion" },
    { nombre: "Validado", valor: "validado" }
  ]
  fcFiltro = new FormControl(this.filtros[0].valor);

  constructor(private _usuarioService: UsuarioService, private _toast:ToastrService) {
    BreadcrumbComponent.update(BC_VALIDAR_DOCUMENTACION);
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

  private mensajeError():void{
    this._toast.error("Hubo un error al cargar información");
  }

  private definirUsuarios(usuarios: any[]): void{
    if(!usuarios.length)
      this._toast.info("No se han encontrado resultados");
    this.usuarios.data = usuarios;
  }

}
