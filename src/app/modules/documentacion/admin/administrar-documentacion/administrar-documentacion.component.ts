import { Component, OnInit, ViewChild } from '@angular/core';
import { BreadcrumbComponent } from "@breadcrumb/breadcrumb.component";
import { BC_ADMINISTRAR_DOCUMENTACION } from "@routing/ListLinks";
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { fadeInDown } from '@shared/animations/router.animations';
import { EnumTipoDato, OPC_TIPO_DATO } from '@models/documentacion/enums/enum-tipo-dato.enum';
import { TipoDato } from '@models/documentacion/tipo-dato';
import { Numero } from '@models/documentacion/numero';

@Component({
  selector: 'app-administrar-documentacion',
  templateUrl: './administrar-documentacion.component.html',
  styleUrls: ['./administrar-documentacion.component.scss'],
  animations: [fadeInDown()]
})
export class AdministrarDocumentacionComponent implements OnInit {
  //Variables OPCIONES DISPONIBLES
  public readonly OPC = OPC_TIPO_DATO;

  //Variables para las tablas
  displayedColumns: string[] = ['nombre', 'requerido', 'tipo', 'subtipo', 'max', 'min', 'tipoArchivo'];
  dataSource: MatTableDataSource<TipoDato>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  listaRequerimientos = [];

  //Variables para los TipoDato Generales
  tipoOpcion: string = "";
  tipos: any = EnumTipoDato.ALL;
  subtipos: any;
  //FormGroup 
  fgGeneral: FormGroup;

  constructor(private _fb: FormBuilder, private toast: ToastrService) {
    BreadcrumbComponent.update(BC_ADMINISTRAR_DOCUMENTACION);
    this.fgGeneral = this._fb.group({
      nombre: ['', Validators.required],
      requerido: ['', Validators.required],
      tipo: ['', Validators.required],
      subtipo: ['', Validators.required],
      min: [0],
      max: [0],
      descripcion: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.updateTablaRequerimiento();
  }

  getNumero(index: number) {
    return new Numero(`Nombre ${index}`, true);
  }

  onChangeSubtipo(tipoSelected: any) {
    switch (tipoSelected) {
      case this.OPC.CAMPO: {
        this.subtipos = EnumTipoDato.CAMPO.subtipos;
        break;
      }
      case this.OPC.ARCHIVO: {
        this.subtipos = EnumTipoDato.ARCHIVO.subtipos;
        break;
      }
      case this.OPC.SELECCION: {
        this.subtipos = EnumTipoDato.SELECCION.subtipos;
        break;
      }
      case this.OPC.FECHA: {
        this.subtipos = EnumTipoDato.FECHA.subtipos;
        break;
      }
      default: {
        break;
      }
    }
    this.subtipo.setValue('');
    this.tipoOpcion = tipoSelected;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  private updateTablaRequerimiento(): void {
    this.dataSource = new MatTableDataSource(this.listaRequerimientos);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  addTipoDato(data: TipoDato) {
    console.log(data);
    console.log(data.tipo);
    if (data instanceof EnumTipoDato) {
      console.log("CORRECTO :v")
    }
    switch (data.tipo) {
      case this.OPC.CAMPO: {
        console.log(this.OPC.CAMPO);
        break;
      }
      case this.OPC.ARCHIVO: {
        console.log(this.OPC.ARCHIVO);
        break;
      }
      default: {
        console.log("Invalid choice");
        break;
      }
    }
    this.toast.success("Se agrego correctamente");
    this.listaRequerimientos.push(this.getNumero(1));
    this.updateTablaRequerimiento();
  }

  //Control de form grpup
  get tipo() {
    return this.fgGeneral.get('tipo') as FormControl;
  }

  get subtipo() {
    return this.fgGeneral.get('subtipo') as FormControl;
  }

}
