import { Component, OnInit, ViewChild, AfterViewInit, Inject } from '@angular/core';
import { BreadcrumbComponent } from '@shared/breadcrumb/breadcrumb.component';
import { BC_GESTION_ADMON, BC_USUARIOS } from '@shared/routing-list/ListLinks';
import { PERMISOS_ADMIN, GESTION_USUARIOS, GESTION_ETAPAS, PAGOS, CONVOCATORIA, EVALUACION, DOCUMENTACION, AccesosAdministrador } from '@shared/admin-permissions/permissions';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { SweetalertService } from '@services/sweetalert/sweetalert.service';
import { AdminService } from '@services/admin/admin.service';

@Component({
  selector: 'app-gestion-admon',
  templateUrl: './gestion-admon.component.html',
  styleUrls: ['./gestion-admon.component.scss']
})
export class GestionAdmonComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['nombres', 'apellidos', 'email', 'permisos', 'acciones'];
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



  constructor(private _adminService: AdminService, private _toast:ToastrService, public dialog: MatDialog, 
      private _swal: SweetalertService, private accesosAdministrador: AccesosAdministrador) {
    BreadcrumbComponent.update(BC_USUARIOS);
    if(this.accesosAdministrador.accesoUsuarios()){
      BreadcrumbComponent.update(BC_GESTION_ADMON);
    }
  }


  ngOnInit(): void {
    //this.usuarios.data = this.listaUsuarios; // DEBUG
    this._adminService.getAdministradores().then((querySnapshot) => {
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
    this._adminService.getAdministradores().then((querySnapshot) => {
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
    this.usuarios.filter = filterValue.trim().toLowerCase();
    if (this.usuarios.paginator) {
      this.usuarios.paginator.firstPage();
    }
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

  visualizarPermisos(row){
    const dialogRef = this.dialog.open(ModalVisualizarPermisos, {
      width: '1000px',
      data: row
    });
    dialogRef.afterClosed().subscribe(result => {});
  }

  eliminarAdministrador(row){
    this._swal.confirmarEliminar(`¿Deseas eliminar al administrador '${row.nombres}' '${row.apellidos}'?`, 'No se podrá revertir esta acción')
    .then((result) => {
      if (result.value) {
        this._adminService.deleteAdministrador(row).then(() => {
          this._swal.adminEliminadoCorrectamente();
          this.onChangeFiltroUsuario(this.fcFiltro.value);
        }).catch(err => this._toast.error(err));
      }
    });
  }
 
}

@Component({
  selector: 'modal-visualizar-permisos',
  templateUrl: './modal-visualizar-permisos.html',
  styleUrls: ['./gestion-admon.component.scss']
})
export class ModalVisualizarPermisos {

  gusuarios: boolean = false;
  getapas: boolean = false;
  gpagos: boolean = false;
  gconvocatoria: boolean = false;
  gevaluacion: boolean = false;
  gdocumentacion: boolean = false;


  constructor(
    public dialogRef: MatDialogRef<ModalVisualizarPermisos>, public sanitizer: DomSanitizer,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.configurarDialog();
  }

  configurarDialog(){
    let permisos = this.data.permisos;
    this.gusuarios = GESTION_USUARIOS & permisos ? true : false;
    this.getapas = GESTION_ETAPAS & permisos ? true : false;
    this.gpagos = PAGOS & permisos ? true : false;
    this.gconvocatoria = CONVOCATORIA & permisos ? true : false;
    this.gevaluacion = EVALUACION & permisos ? true : false;
    this.gdocumentacion = DOCUMENTACION & permisos ? true : false;
    console.log("Se ejecuto")
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}