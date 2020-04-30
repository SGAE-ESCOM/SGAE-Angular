import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { BreadcrumbComponent } from '@shared/breadcrumb/breadcrumb.component';
import { BC_GESTION_ASPIRANTES } from '@shared/routing-list/ListLinks';
import { UsuarioService } from '@services/usuario/usuario.service';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormControl } from '@angular/forms';

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
    {nombre: 'Ambos', valor: 'true'},
    {nombre: 'Validada', valor: 'validada'},
    {nombre: 'Invalida', valor: 'invalida'}
  ];
  fcFiltro = new FormControl(this.filtros[0].valor);

  constructor(private _usuarioService: UsuarioService, private _toast:ToastrService) {
    BreadcrumbComponent.update(BC_GESTION_ASPIRANTES);
  }

  ngOnInit(): void {
    this._usuarioService.getAspirantes().then((querySnapshot) => {
      let usuarios = [];
      querySnapshot.forEach((doc) => {
        let user = doc.data();
        if(user.estado === undefined || user.estado.documentacion === undefined){
          user['estado'] = {'documentacion' : 'invalida'};
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
          user['estado'] = {'documentacion' : 'invalida'};
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

  eliminarUsuario(row){
    console.log('eliminando usuario')
  }

  private updateTablaUsuarios(): void {
    this.usuarios.paginator = this.paginator;
    this.usuarios.sort = this.sort;
  }

  private mensajeError():void{
    this._toast.error("Hubo un error al cargar información");
  }

}
