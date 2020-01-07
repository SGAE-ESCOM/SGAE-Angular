import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
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
import { AdministrarDocumentacionService } from '@services/documentacion/administrar-documentacion.service';

@Component({
  selector: 'app-administrar-documentacion',
  templateUrl: './administrar-documentacion.component.html',
  styleUrls: ['./administrar-documentacion.component.scss'],
  animations: [fadeInDown()]
})
export class AdministrarDocumentacionComponent implements OnInit, AfterViewInit{

  //Variables OPCIONES DISPONIBLES
  public readonly OPC = OPC_TIPO_DATO;

  //Variables para las tablas
  displayedColumns: string[] = ['nombre', 'requerido', 'tipo', 'subtipo', 'min', 'max', 'tipoArchivo', 'acciones'];
  documentos: MatTableDataSource<TipoDato> = new MatTableDataSource();;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  //Variables para los TipoDato Generales
  tipoOpcion: string = "";
  tipos: any = EnumTipoDato.ALL;
  tipoDescripcion: string;
  subtipos: any;
  subtiposDescripcion: string;

  //FormGroup
  fgGeneral: FormGroup;
  opcMin: FormControl;
  opcMax: FormControl;

  constructor(private _fb: FormBuilder, private toast: ToastrService, private _ads: AdministrarDocumentacionService) {
    BreadcrumbComponent.update(BC_ADMINISTRAR_DOCUMENTACION);
    this.initForm();
  }

  ngOnInit() {
    this._ads.getDocumentos().subscribe( (documentos:TipoDato[]) => this.documentos.data = documentos );
    this.opcMin.valueChanges.subscribe(valor => valor ? this.min.enable() : this.min.disable());
    this.opcMax.valueChanges.subscribe(valor => valor ? this.max.enable() : this.max.disable());
  }

  ngAfterViewInit(){
    this.updateTablaRequerimiento();
  }

  auxBoton(){
    this.updateTablaRequerimiento();
  }

  getNumero(index: number) {
    return new Numero(`Nombre ${index}`, true);
  }

  enableControles(arrayFormControl: FormControl[]) {
    arrayFormControl.forEach(formControl => formControl.enable());
  }

  disableControles(arrayFormControl: FormControl[]) {
    arrayFormControl.forEach(formControl => formControl.disable());
  }

  offToggels(arrayFormControl: FormControl[]) {
    arrayFormControl.forEach(formControl => { formControl.patchValue(false) });
  }

  onChangeSubtipo(tipoSelected: string) {
    switch (tipoSelected) {
      case this.OPC.CAMPO: {
        this.subtipos = EnumTipoDato.CAMPO.subtipos;
        this.tipoDescripcion = EnumTipoDato.CAMPO.descripcion;
        //this.enableControles([this.min, this.max]);
        this.disableControles([this.descripcion, this.fechaMin, this.fechaMax]);
        break;
      }
      case this.OPC.ARCHIVO: {
        this.subtipos = EnumTipoDato.ARCHIVO.subtipos;
        this.tipoDescripcion = EnumTipoDato.ARCHIVO.descripcion;
        this.enableControles([this.descripcion]);
        this.disableControles([this.min, this.max, this.fechaMin, this.fechaMax]);
        this.offToggels([this.opcMin, this.opcMax]);
        break;
      }
      case this.OPC.SELECCION: {
        this.subtipos = EnumTipoDato.SELECCION.subtipos;
        this.tipoDescripcion = EnumTipoDato.SELECCION.descripcion;
        this.disableControles([this.min, this.max, this.descripcion, this.fechaMin, this.fechaMax]);
        this.offToggels([this.opcMin, this.opcMax]);
        break;
      }
      case this.OPC.FECHA: {
        this.subtipos = EnumTipoDato.FECHA.subtipos;
        this.tipoDescripcion = EnumTipoDato.FECHA.descripcion;
        this.enableControles([this.fechaMin, this.fechaMax]);
        this.disableControles([this.descripcion, this.min, this.max]);
        this.offToggels([this.opcMin, this.opcMax]);
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
    this.documentos.filter = filterValue.trim().toLowerCase();
    if (this.documentos.paginator) {
      this.documentos.paginator.firstPage();
    }
  }

  private updateTablaRequerimiento(): void {
    this.documentos.paginator = this.paginator;
    this.documentos.sort = this.sort;
  }

  addTipoDato(documento: TipoDato) {
    if (this.fgGeneral.valid) {
      switch (documento.tipo) {
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
      this._ads.createDocumento(documento);
      this.updateTablaRequerimiento();
    } else {
      this.toast.error("Llena todos los campos requeridos");
    }
  }

  //Getters de FormControl mas cortos
  initForm() {
    this.fgGeneral = this._fb.group({
      nombre: ['', Validators.required],
      requerido: [true, Validators.required],
      tipo: ['', Validators.required],
      subtipo: ['', Validators.required],
      min: [{ value: 0, disabled: true }, Validators.required],
      max: [{ value: 0, disabled: true }, Validators.required],
      fechaMin: ['', Validators.required],
      fechaMax: ['', Validators.required],
      descripcion: ['']
    });
    this.opcMin = new FormControl(false);
    this.opcMax = new FormControl(false);
  }

  get requerido() {
    return this.fgGeneral.get('requerido') as FormControl;
  }

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

  get fechaMin() {
    return this.fgGeneral.get('fechaMin') as FormControl;
  }

  get fechaMax() {
    return this.fgGeneral.get('fechaMax') as FormControl;
  }

  get descripcion() {
    return this.fgGeneral.get('descripcion') as FormControl;
  }

}