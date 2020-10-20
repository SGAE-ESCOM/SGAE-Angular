import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Tabla } from '@models/utils/Tabla';

@Component({
  selector: 'app-tabla',
  templateUrl: './main-tablas.component.html',
  styleUrls: ['./main-tablas.component.scss']
})
export class MainTablasComponent implements OnInit, OnChanges {

  /**
   * Arreglo de las columnas tipo @Tabla que tendra la tabla
   */
  @Input() columnas: Tabla[] = [];
  @Input() datos: any[] = [];
  @Input() isCargando: boolean = false;

  @Input() isSave: boolean = false;
  @Input() isUpdate: boolean = false;
  @Input() isDelete: boolean = false;
  
  @Output() save: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() show: EventEmitter<any> = new EventEmitter<any>();
  @Output() update: EventEmitter<any> = new EventEmitter<any>();;
  @Output() delete: EventEmitter<any> = new EventEmitter<any>();;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  encabezado: string[] = [];

  constructor() {
  }

  ngOnInit(): void {
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['datos']){
      this.updateTabla();
    }
    if(changes['columnas']){
      this.updateColumnas();
    }
  }

  onSave(){
    this.save.emit(true);
  }

  onShow(fila:any){
    this.show.emit(fila);
  }

  onUpdate(fila:any){
    this.update.emit(fila);
  }

  onDelete(fila:any){
    this.delete.emit(fila);
  }

  buscarEnTabla(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  private updateTabla(){
    this.dataSource.data = this.datos;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  
  private updateColumnas(){
    this.encabezado = this.columnas.map( columna => columna.json );
  }

}