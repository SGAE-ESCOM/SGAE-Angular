import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { BreadcrumbComponent } from '@shared/breadcrumb/breadcrumb.component';
import { BC_GESTION_ASPIRANTES, BC_USUARIOS } from '@shared/routing-list/ListLinks';
import { UsuarioService } from '@services/usuario/usuario.service';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormControl } from '@angular/forms';
import { SweetalertService } from '@services/sweetalert/sweetalert.service';
import { comprobarPermisos, GESTION_USUARIOS } from '@shared/admin-permissions/permissions';
import { AuthService } from '@services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gestion-aspirantes',
  templateUrl: './gestion-aspirantes.component.html',
  styleUrls: ['./gestion-aspirantes.component.scss']
})
export class GestionAspirantesComponent implements OnInit, AfterViewInit {

  usuarios: MatTableDataSource<any> = new MatTableDataSource();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  displayedColumns: string[] = ['nombres', 'apellidos', 'email', 'estadoDoc', 'acciones'];

  filtros: any[] = [
    {nombre: 'Todos', valor: 'true'},
    {nombre: 'Sin Estado', valor: 'Sin Estado'},
    {nombre: 'Validada', valor: 'validada'},
    {nombre: 'Invalida', valor: 'invalida'}
  ];
  fcFiltro = new FormControl(this.filtros[0].valor);

  constructor(private _usuarioService: UsuarioService, private _toast:ToastrService, private _swal: SweetalertService, 
      private _authServices: AuthService, private router: Router) {
    let usuario = this._authServices.getUsuarioC();
    BreadcrumbComponent.update(BC_USUARIOS);
    if(comprobarPermisos(usuario, GESTION_USUARIOS, router)){
      BreadcrumbComponent.update(BC_GESTION_ASPIRANTES);
    }
  }

  ngOnInit(): void {
    this._usuarioService.getAspirantes().then((querySnapshot) => {
      let usuarios = [];
      querySnapshot.forEach((doc) => {
        let user = doc.data();
        if(user.estado === undefined || user.estado.documentacion === undefined){
          user['estado'] = {'documentacion' : 'Sin Estado'};
        }
        usuarios.push(user);
      });
      this.usuarios.data = usuarios;
    }).catch( err =>  {this.mensajeError()
      console.log(err);
    });
  }

  ngAfterViewInit(): void {
    this.updateTablaUsuarios();
  }

  //Eventos
  onChangeFiltroUsuario(filtro) {
    this._usuarioService.getAspirantes().then((querySnapshot) => {
      let usuarios = [];
      querySnapshot.forEach((doc) => {
        let user = doc.data();
        if(user.estado === undefined || user.estado.documentacion === undefined){
          user['estado'] = {'documentacion' : 'Sin Estado'};
        }
        if(filtro === 'true' || user.estado.documentacion === filtro){
          usuarios.push(user);
        }
      });
      this.definirUsuarios(usuarios);
    }).catch( err =>  {
      this.mensajeError()
      console.log(err);
    });
    this.updateTablaUsuarios();
  }

  private definirUsuarios(usuarios: any[]): void{
    if(!usuarios.length)
      this._toast.info("No se han encontrado resultados");
    this.usuarios.data = usuarios;
  }

  buscarUsuario(filterValue: string) {
    this.usuarios.filter = filterValue.trim().toLowerCase();
    if (this.usuarios.paginator) {
      this.usuarios.paginator.firstPage();
    }
  }

  eliminarAspirante(row){
    this._swal.confirmarEliminar(`¿Deseas eliminar al aspirante '${row.nombres} ${row.apellidos}'?`, 'No se podrá revertir esta acción')
    .then((result) => {
      if (result.value) {
        this._usuarioService.deleteAspirante(row).then(() => {
          this._swal.aspiranteEliminadoCorrectamente();
          this.onChangeFiltroUsuario(this.fcFiltro.value);
        }).catch(err => this._toast.error(err));
      }
    });
  }

  private updateTablaUsuarios(): void {
    this.usuarios.paginator = this.paginator;
    this.usuarios.sort = this.sort;
  }

  private mensajeError():void{
    this._toast.error("Hubo un error al cargar información");
  }

}
