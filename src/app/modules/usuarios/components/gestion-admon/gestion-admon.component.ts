import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { BreadcrumbComponent } from '@shared/breadcrumb/breadcrumb.component';
import { BC_GESTION_ADMON } from '@shared/routing-list/ListLinks';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

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


  constructor() {
    BreadcrumbComponent.update(BC_GESTION_ADMON);
  }


  ngOnInit(): void {
    this.usuarios.data = this.listaAdmins; // DEBUG
  }

  ngAfterViewInit(): void {
    this.updateTablaUsuarios();
  }

  private updateTablaUsuarios(): void {
    this.usuarios.paginator = this.paginator;
    this.usuarios.sort = this.sort;
  }
}
