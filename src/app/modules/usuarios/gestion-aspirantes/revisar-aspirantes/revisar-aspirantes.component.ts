import { Component, OnInit, AfterViewInit, ViewChild, Inject } from '@angular/core';
import { BreadcrumbComponent } from '@breadcrumb/breadcrumb.component';
import { BC_REVISAR_ASPIRANTES, BC_USUARIOS } from '@shared/routing-list/ListLinks';
import { UsuarioService } from '@services/usuario/usuario.service';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SweetalertService } from '@services/sweetalert/sweetalert.service';
import { comprobarPermisos, GESTION_USUARIOS, sinAcceso } from '@shared/admin-permissions/permissions';
import { AuthService } from '@services/auth.service';
import { Router } from '@angular/router';
import { MatDialog} from '@angular/material/dialog';
import { EtapasService } from '@services/etapas/etapas.service';
import { UsuarioInterface } from '@models/persona/usuario';

@Component({
  selector: 'app-revisar-aspirantes',
  templateUrl: './revisar-aspirantes.component.html',
  styleUrls: ['./revisar-aspirantes.component.scss']
})
export class RevisarAspirantesComponent implements OnInit, AfterViewInit {

  usuarios: MatTableDataSource<any> = new MatTableDataSource();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  displayedColumns: string[] = ['nombres', 'apellidos', 'email', 'acciones'];
  colEstadoOn: boolean = false;
  etapaSeleccionada: any;

  constructor(private _usuarioService: UsuarioService, private _toast:ToastrService, private _swal: SweetalertService, 
      private _authServices: AuthService, private _router: Router, public dialog: MatDialog, private _etapas: EtapasService) {
    let usuario = this._authServices.getUsuarioC();
    BreadcrumbComponent.update(BC_USUARIOS);
    //Comprobar Permisos
    if(usuario.rol != 'root' && !comprobarPermisos(usuario, GESTION_USUARIOS, _router)) sinAcceso(_router);
    BreadcrumbComponent.update(BC_REVISAR_ASPIRANTES);
  }

  ngOnInit(): void {
    this.loadAspirantes();
  }

  ngAfterViewInit(): void {
    this.updateTablaUsuarios();
  }

  //Eventos
  loadAspirantes() {
    this._usuarioService.getAspirantes().then((querySnapshot) => {
      let usuarios = [];
      querySnapshot.forEach((doc) => {
        let user = doc.data();
        usuarios.push(user);
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
          this.loadAspirantes();
        }).catch(err => this._toast.error(err));
      }
    });
  }

  verAspirante(row: UsuarioInterface){
    this._router.navigate(['/app/usuarios/gestion-aspirantes/revisar-aspirantes/ver-aspirante'], 
      { state: { userId: JSON.stringify(row.id) } });
  }

    


  private updateTablaUsuarios(): void {
    this.usuarios.paginator = this.paginator;
    this.usuarios.sort = this.sort;
  }

  private mensajeError():void{
    this._toast.error("Hubo un error al cargar información");
  }

}