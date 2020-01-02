import { Component, OnInit, ViewChild } from '@angular/core';
import { BreadcrumbComponent } from "@breadcrumb/breadcrumb.component";
import { BC_ADMINISTRAR_DOCUMENTACION } from "@routing/ListLinks";
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { fadeInDown } from '@shared/animations/router.animations';
import { ToastrService } from 'ngx-toastr';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TipoDato } from '@models/documentacion/tipo-dato';
import { EnumTipoDato } from '@models/documentacion/enums/enum-tipo-dato.enum';
import { Numero } from '@models/documentacion/numero';

@Component({
  selector: 'app-administrar-documentacion',
  templateUrl: './administrar-documentacion.component.html',
  styleUrls: ['./administrar-documentacion.component.scss'],
  animations: [fadeInDown()]
})
export class AdministrarDocumentacionComponent implements OnInit {

  //Variables para las tablas
  displayedColumns: string[] = ['nombre', 'requerido', 'tipo', 'max', 'min', 'tipoArchivo'];
  dataSource: MatTableDataSource<TipoDato>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  listaRequerimientos = [];

  //Variables para los TipoDato Generales
  tipoComplemento: string = "";
  tipoDatos: any = EnumTipoDato.ALL;
  //FormGroup 
  fgGeneral: FormGroup;

  //Validacion para fechas
  minDate = new Date(2000, 0, 1);
  maxDate = new Date(2020, 0, 1);

  constructor(private _fb: FormBuilder, private toast: ToastrService) {
    BreadcrumbComponent.update(BC_ADMINISTRAR_DOCUMENTACION);
    this.fgGeneral = this._fb.group({
      tipoDato: ['', Validators.required],
      subtipo: ['', Validators.required],
      min: [0],
      max: [0]
    });
  }

  ngOnInit() {
    this.updateTablaRequerimiento();
  }

  getDocumentacion(index) {
    const tipoDatoAux: TipoDato = {
      nombre: `Atributo ${index}`,
      requerido: true
    };
    return tipoDatoAux;
  }

  getNumero(index: number) {
    const numero: Numero = {
      nombre: `Soy un numero :v ${index}`,
      requerido: true,
      min: index,
      max: 100 + index,
      valor: 2 * index
    };
    return numero;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  cambiarSubData() {
    this.fgGeneral.get('subtipo').setValue('');
    this.tipoComplemento = this.fgGeneral.get('tipoDato').value.nombre;
    console.log(this.tipoComplemento);
  }

  alert2() {
    this.toast.success("Se agrego correctamente");
    this.listaRequerimientos.push(this.getNumero(1));
    this.updateTablaRequerimiento();
  }

  private updateTablaRequerimiento(): void {
    this.dataSource = new MatTableDataSource(this.listaRequerimientos);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  //Control de form grpup
  setFormGroupNumber() {
    this.fgGeneral = this._fb.group({
      tipoDato: ['', Validators.required],
      subtipo: ['', Validators.required],
      min: [0],
      max: [0]
    });
  }


}
