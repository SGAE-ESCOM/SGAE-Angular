import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { BreadcrumbComponent } from '@shared/breadcrumb/breadcrumb.component';
import { BC_GESTION_ADMON } from '@shared/routing-list/ListLinks';
import { PERMISOS_ADMIN } from '@shared/admin-permissions/permissions';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormControl } from '@angular/forms';
import { UsuarioService } from '@services/usuario/usuario.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-gestion-admon',
  templateUrl: './gestion-admon.component.html',
  styleUrls: ['./gestion-admon.component.scss']
})
export class GestionAdmonComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['nombres', 'apellidos', 'email', 'acciones'];
  usuarios: MatTableDataSource<any> = new MatTableDataSource();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator; //Preguntar su funcion
  @ViewChild(MatSort, { static: true }) sort: MatSort; //Preguntar su funcion

  //Varibale DEBUG
  listaAdmins: any[] = [ //DEBUG
    { "id": "1", "nombres": "Gustavo Andres", "apellidos": "Lopez Sanchez", "email": "@hotmail.com" },
    { "id": "2", "nombres": "Aiko Dallane", "apellidos": "López Rivera", "email": "@gmail.com" },
    { "id": "3", "nombres": "Edgar", "apellidos": "Flores Altamirano", "email": "@yahoo.com" },
    { "id": "4", "nombres": "Christian Andres", "apellidos": "Cervantes Moreno", "email": "@live.com.mx" },
  ];

  filtros: any[] = PERMISOS_ADMIN;
  fcFiltro = new FormControl(this.filtros[0].valor);

  constructor(private _usuarioService: UsuarioService, private _toast:ToastrService) {
    BreadcrumbComponent.update(BC_GESTION_ADMON);
  }


  ngOnInit(): void {
    //this.usuarios.data = this.listaUsuarios; // DEBUG
    this._usuarioService.getAdministradores().then((querySnapshot) => {
      let usuarios = [];
      querySnapshot.forEach((doc) => {
        usuarios.push(doc.data());
      });
      this.usuarios.data = usuarios;
    }).catch( err =>  this.mensajeError());
  }

  ngAfterViewInit(): void {
    this.updateTablaUsuarios();
  }

  //Eventos
  onChangeFiltroUsuario(filtro) {
    this._usuarioService.getAdministradores().then((querySnapshot) => {
      let usuarios = [];
      querySnapshot.forEach((doc) => {
        let user: any[] = doc.data();
        if((user["permisos"] & filtro) > 0){
          usuarios.push(doc.data());
        }
      });
      this.definirUsuarios(usuarios);
    }).catch( err =>  this.mensajeError());
    this.updateTablaUsuarios();
  }

  buscarUsuario(filterValue: string) {
    // this.usuarios.filter = filterValue.trim().toLowerCase();
    // if (this.usuarios.paginator) {
    //   this.usuarios.paginator.firstPage();
    // }
  }

  registrarNuevoAdmin(){
    
  }

  private updateTablaUsuarios(): void {
    this.usuarios.paginator = this.paginator;
    this.usuarios.sort = this.sort;
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
