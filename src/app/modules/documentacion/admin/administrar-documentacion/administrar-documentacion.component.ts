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
  tipoDescripcion: string;
  subtipos: any;
  subtiposDescripcion: string;

  //FormGroup
  fgGeneral: FormGroup;

  constructor(private _fb: FormBuilder, private toast: ToastrService) {
    BreadcrumbComponent.update(BC_ADMINISTRAR_DOCUMENTACION);
    this.fgGeneral = this._fb.group({
      nombre: ['', Validators.required],
      requerido: [true, Validators.required],
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

  enableControles( arrayFormControl:FormControl[] ){
    arrayFormControl.forEach(formControl => formControl.enable() );
  }

  disableControles( arrayFormControl:FormControl[] ){
    arrayFormControl.forEach(formControl => formControl.disable() );
  }

  onChangeSubtipo(tipoSelected: string) {
    switch (tipoSelected) {
      case this.OPC.CAMPO: {
        this.subtipos = EnumTipoDato.CAMPO.subtipos;
        this.tipoDescripcion = EnumTipoDato.CAMPO.descripcion;
        this.enableControles( [ this.min, this.max ] );
        this.disableControles( [ this.descripcion] ); 
        break;
      }
      case this.OPC.ARCHIVO: {
        this.subtipos = EnumTipoDato.ARCHIVO.subtipos;
        this.tipoDescripcion = EnumTipoDato.ARCHIVO.descripcion;
        this.enableControles( [ this.descripcion] ); 
        this.disableControles( [ this.min, this.max ] );
        break;
      }
      case this.OPC.SELECCION: {
        this.subtipos = EnumTipoDato.SELECCION.subtipos;
        this.tipoDescripcion = EnumTipoDato.SELECCION.descripcion;
        break;
      }
      case this.OPC.FECHA: {
        this.subtipos = EnumTipoDato.FECHA.subtipos;
        this.tipoDescripcion = EnumTipoDato.FECHA.descripcion;
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
    if( this.fgGeneral.valid ){
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
      this.listaRequerimientos.push(data);
      this.updateTablaRequerimiento();
    }else{
      this.toast.error("Llena todos los campos requeridos");
    }
  }

  //Getters de FormControl mas cortos
  get tipo() {
    return this.fgGeneral.get('tipo') as FormControl;
  }

  get subtipo() {
    return this.fgGeneral.get('subtipo') as FormControl;
  }

  get min() {
    return this.fgGeneral.get('min') as FormControl;
  }

  get max() {
    return this.fgGeneral.get('max') as FormControl;
  }

  get descripcion() {
    return this.fgGeneral.get('descripcion') as FormControl;
  }

  
}
