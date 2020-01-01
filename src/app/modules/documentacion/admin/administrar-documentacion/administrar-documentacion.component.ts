import { Component, OnInit, ViewChild } from '@angular/core';
import { BreadcrumbComponent } from "@breadcrumb/breadcrumb.component";
import { BC_ADMINISTRAR_DOCUMENTACION } from "@routing/ListLinks";
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { EnumTipoDato } from '@models/documentacion/enums/enum-tipo-dato.enum';
import { fadeInDown } from '@shared/animations/router.animations';
import { ToastrService } from 'ngx-toastr';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TipoDato } from '@models/documentacion/tipo-dato';

@Component({
  selector: 'app-administrar-documentacion',
  templateUrl: './administrar-documentacion.component.html',
  styleUrls: ['./administrar-documentacion.component.scss'],
  animations: [fadeInDown()]
})
export class AdministrarDocumentacionComponent implements OnInit {

  //Variables para las tablas
  displayedColumns: string[] = ['nombre', 'requerido'];
  dataSource: MatTableDataSource<TipoDato>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  //Variables para los TipoDato Generales
  tipoComplemento: string = "";
  tipoDatos: any = EnumTipoDato.ALL;
  fcTipoDato: FormControl = new FormControl('', [Validators.required]);
  fcTipoSubDato: FormControl = new FormControl('', [Validators.required]);
  //Validacion para fechas
  minDate = new Date(2000, 0, 1);
  maxDate = new Date(2020, 0, 1);

  constructor(private _fb: FormBuilder, private toast: ToastrService) {
    BreadcrumbComponent.update(BC_ADMINISTRAR_DOCUMENTACION);
    // Create 100 users
    const documentacion = Array.from({length: 10}, (_, k) => this.getDocumentacion(k+1) );

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(documentacion);
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getDocumentacion(index){
    const tipoDatoAux: TipoDato = {
      nombre : `Atributo ${index}`,
      requerido: true
    };
    return tipoDatoAux;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  cambiarSubData() {
    this.fcTipoSubDato = new FormControl('', [Validators.required]);
    this.tipoComplemento = this.fcTipoDato.value.nombre;
  }

  alert2() {
    this.toast.success("Hola perro ");
  }

}
