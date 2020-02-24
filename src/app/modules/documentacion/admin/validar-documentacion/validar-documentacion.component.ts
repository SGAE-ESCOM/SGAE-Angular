import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { BreadcrumbComponent } from '@shared/breadcrumb/breadcrumb.component';
import { BC_VALIDAR_DOCUMENTACION } from '@shared/routing-list/ListLinks';
import { UsuarioInterface } from '@models/persona/usuario';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatSort } from '@angular/material';
import { UsuarioService } from '@services/usuario/usuario.service';

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

  filtros: string[] = [
    "Sin revision",
    "Pendiente de correccion",
    "Validado"
  ]

  constructor(private _usuarioService: UsuarioService) {
    BreadcrumbComponent.update(BC_VALIDAR_DOCUMENTACION);
  }

  ngOnInit() {
    //this._usuarioService.getAspirantes().then((aspirantes: UsuarioInterface[]) => this.usuarios.data = aspirantes ); //PROD
    //this.usuarios.data = this.listaUsuarios; // DEBUG
    this._usuarioService.getAspirantes().then( (querySnapshot) => {
      let usuarios = [];
      querySnapshot.forEach( (doc) => {        
        usuarios.push( doc.data() );
      });
      this.usuarios.data = usuarios;
    });
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
    alert(filtro);
  }

  buscarUsuario(filterValue: string) {
    this.usuarios.filter = filterValue.trim().toLowerCase();
    if (this.usuarios.paginator) {
      this.usuarios.paginator.firstPage();
    }
  }

}
