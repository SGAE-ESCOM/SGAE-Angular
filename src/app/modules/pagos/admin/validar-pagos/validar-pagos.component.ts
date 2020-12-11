import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { BreadcrumbComponent } from '@components/breadcrumb/breadcrumb.component';
import { EstadoPago } from '@models/cuentas-pagos/enums/estado-pago.enum';
import { AuthService } from '@services/auth.service';
import { UsuarioService } from '@services/usuario/usuario.service';
import { BC_VALIDAR_PAGOS } from '@shared/routing-list/ListLinks';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-validar-pagos',
  templateUrl: './validar-pagos.component.html',
  styleUrls: ['./validar-pagos.component.scss']
})
export class ValidarPagosComponent  implements OnInit, AfterViewInit {

    //Variables para las tablas
    displayedColumns: string[] = ['nombres', 'apellidos', 'estado', 'acciones'];
    usuarios: MatTableDataSource<any> = new MatTableDataSource();;
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;
  
    filtros: any[] = [
      { nombre: "Pendiente de revisión", valor: EstadoPago.REVISION },
      { nombre: "Pendiente de corrección", valor: EstadoPago.INVALIDA },
      { nombre: "Sin evidencia de pago", valor: EstadoPago.PENDIENTE },
      { nombre: "Validado", valor: EstadoPago.VALIDADA }
    ]
    fcFiltro = new FormControl(this.filtros[0].valor);


  constructor(private _router:Router, private _usuarioService: UsuarioService, private _toast:ToastrService, 
      private _authServices: AuthService) { 
    
    BreadcrumbComponent.update(BC_VALIDAR_PAGOS);
  }

  ngOnInit() {
    //this.usuarios.data = this.listaUsuarios; // DEBUG
    this._usuarioService.getAspirantesConEstadoPago(EstadoPago.REVISION).then((querySnapshot) => {
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
  onChangeFiltroEstado(filtro) {
    this._usuarioService.getAspirantesConEstadoPago(filtro).then((querySnapshot) => {
      let usuarios = [];
      querySnapshot.forEach((doc) => {
        usuarios.push(doc.data());
      });
      this.definirUsuarios(usuarios);
    }).catch( err =>  this.mensajeError());
    this.updateTablaUsuarios();
  }

  buscarUsuario(filterValue: string) {
    this.usuarios.filter = filterValue.trim().toLowerCase();
    if (this.usuarios.paginator) {
      this.usuarios.paginator.firstPage();
    }
  }

  goto( infoUsuario: any ){
    if(infoUsuario.estado.pago == EstadoPago.PENDIENTE) return;
    this._router.navigate(['/app/pagos/validar-pagos/aspirante'], { state: { usuario: JSON.stringify(infoUsuario) } });
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