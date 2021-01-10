import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { BreadcrumbComponent } from '@components/breadcrumb/breadcrumb.component';
import { filtrosEstadosDocumentacion, filtrosEstadosEvaluacion, filtrosEstadosPagos, filtrosEstadosResultados, filtrosEtapas } from '@models/utils/Filtros';
import { AuthService } from '@services/auth.service';
import { EtapasService } from '@services/etapas/etapas.service';
import { SweetalertService } from '@services/sweetalert/sweetalert.service';
import { UsuarioService } from '@services/usuario/usuario.service';
import { comprobarPermisos, GESTION_USUARIOS, sinAcceso } from '@shared/admin-permissions/permissions';
import { BC_ASIGNAR_ASPIRANTES, BC_REVISAR_ASPIRANTES, BC_USUARIOS } from '@shared/routing-list/ListLinks';
import { ToastrService } from 'ngx-toastr';
import { ModalVisualizarEstados } from '../revisar-aspirantes/revisar-aspirantes.component';

@Component({
  selector: 'app-asignar-aspirantes',
  templateUrl: './asignar-aspirantes.component.html',
  styleUrls: ['./asignar-aspirantes.component.scss']
})
export class AsignarAspirantesComponent implements OnInit, AfterViewInit {

  usuarios: MatTableDataSource<any> = new MatTableDataSource();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  displayedColumns: string[] = ['nombres', 'apellidos', 'email',  'estados', 'acciones'];
  fcFiltroEstados: FormControl = new FormControl();
  filtrosEstados: any[] = [];
  fcFiltroEtapas = new FormControl(filtrosEtapas[0].valor);
  filtrosEtapas = filtrosEtapas;
  colEstadoOn: boolean = false;
  etapaSeleccionada: any;

  constructor(private _usuarioService: UsuarioService, private _toast:ToastrService, private _swal: SweetalertService, 
      private _authServices: AuthService, private router: Router, public dialog: MatDialog, private _etapas: EtapasService) {
    let usuario = this._authServices.getUsuarioC();
    BreadcrumbComponent.update(BC_USUARIOS);
    //Comprobar Permisos
    if(usuario.rol != 'root' && !comprobarPermisos(usuario, GESTION_USUARIOS, router)) sinAcceso(router);
    BreadcrumbComponent.update(BC_ASIGNAR_ASPIRANTES);
  }

  ngOnInit(): void {
    this.onChangeFiltroEstado('true');
  }

  ngAfterViewInit(): void {
    this.updateTablaUsuarios();
  }

  //Eventos
  onChangeFiltroEstado(filtro) {
    this._usuarioService.getAspirantes().then((querySnapshot) => {
      let usuarios = [];
      querySnapshot.forEach((doc) => {
        let user = doc.data();
        if(filtro == 'true') usuarios.push(user);
        else {
          let etapa = this.etapaSeleccionada.valor;
          switch(etapa){
            case 'documentacion':
              if(user.estado.documentacion === filtro) usuarios.push(user);
              break;
            case 'evaluacionConocimientos':
              if(user.estado.evaluacionConocimientos === filtro) usuarios.push(user);
              break;
            case 'pago':
              if(user.estado.pago === filtro) usuarios.push(user);
              break;
          }
        }
      });
      this.definirUsuarios(usuarios);
    }).catch( err =>  {
      this.mensajeError()
      console.log(err);
    });
    this.updateTablaUsuarios();
  }

  onChangeFiltroEtapa(filtro) {
    console.log(this._authServices.getEtapas()['pago']);

    if (filtro == 'true'){
      this.displayedColumns = ['nombres', 'apellidos', 'email',  'estados', 'acciones'];
      this.colEstadoOn = false;
      this.fcFiltroEstados = new FormControl();
      this.filtrosEstados = [];
    } else {
      this.etapaSeleccionada = filtrosEtapas.find(etapa => etapa.valor == filtro);
      this.displayedColumns = ['nombres', 'apellidos', 'email', 'colEstado',  'estados', 'acciones'];
      this.colEstadoOn = true;

      if(filtro == 'documentacion'){
        this.fcFiltroEstados = new FormControl(filtrosEstadosDocumentacion[0].valor);
        this.filtrosEstados = filtrosEstadosDocumentacion;
      }
      else if(filtro == 'evaluacionConocimientos'){
        this.fcFiltroEstados = new FormControl(filtrosEstadosEvaluacion[0].valor);
        this.filtrosEstados = filtrosEstadosEvaluacion;
      }
      else if(filtro == 'pago'){
        this.fcFiltroEstados = new FormControl(filtrosEstadosPagos[0].valor);
        this.filtrosEstados = filtrosEstadosPagos;
      }
    }
    this.onChangeFiltroEstado('true');
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
          this.onChangeFiltroEstado('true');
        }).catch(err => this._toast.error(err));
      }
    });
  }

  visualizarEstados(row){
    const dialogRef = this.dialog.open(ModalVisualizarEstados, {
      width: '400px',
      data: row
    });
    dialogRef.afterClosed().subscribe(result => {});
  }

  private updateTablaUsuarios(): void {
    this.usuarios.paginator = this.paginator;
    this.usuarios.sort = this.sort;
  }

  private mensajeError():void{
    this._toast.error("Hubo un error al cargar información");
  }

}