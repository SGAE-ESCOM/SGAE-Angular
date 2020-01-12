import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { BreadcrumbComponent } from "@breadcrumb/breadcrumb.component";
import { BC_ADMINISTRAR_DOCUMENTACION } from "@routing/ListLinks";
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { fadeInDown, fadeInOutDown, fadeInOutLeft } from '@shared/animations/router.animations';
import { EnumTipoDato, OPC_TIPO_DATO } from '@models/documentacion/enums/enum-tipo-dato.enum';
import { TipoDato } from '@models/documentacion/tipo-dato';
import { Numero } from '@models/documentacion/numero';
import { AdministrarDocumentacionService } from '@services/documentacion/administrar-documentacion.service';

@Component({
  selector: 'app-administrar-documentacion',
  templateUrl: './administrar-documentacion.component.html',
  styleUrls: ['./administrar-documentacion.component.scss'],
  animations: [fadeInDown(), fadeInOutDown(), fadeInOutLeft()]
})
export class AdministrarDocumentacionComponent implements OnInit, AfterViewInit {

  //Variables OPCIONES DISPONIBLES
  public readonly OPC = OPC_TIPO_DATO;

  //Variables para las tablas
  displayedColumns: string[] = ['nombre', 'requerido', 'tipo', 'subtipo', 'min', 'max', 'tipoArchivo', 'acciones'];
  documentos: MatTableDataSource<TipoDato> = new MatTableDataSource();;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  //Variables para Vista previa
  tituloVistaPrevia = 'Vista previa de requisitos';
  listaRequisitos = [
    { "nombre": "CURP Min-Max", "requerido": true, "tipo": "campo", "subtipo": "texto", "min": 18, "max": 18},
    { "nombre": "CURP Min", "requerido": true, "tipo": "campo", "subtipo": "texto", "min": 18},
    { "nombre": "CURP Max", "requerido": true, "tipo": "campo", "subtipo": "texto", "max": 18},
    { "nombre": "Edad Min-Max", "requerido": true, "tipo": "campo", "subtipo": "número", "min": 18, "max": 30 },
    { "nombre": "Edad Min", "requerido": true, "tipo": "campo", "subtipo": "número", "min": 18 },
    { "nombre": "Edad Max", "requerido": true, "tipo": "campo", "subtipo": "número", "max": 30 },
    { "nombre": "Genero", "requerido": true, "tipo": "seleccion", "subtipo": "unica", "opciones": { "Hombre": "Hombre", "Mujer": "Mujer", "Otro": "Otro" } },
    { "nombre": "Acta de Nacimiento PDF", "requerido": true, "tipo": "archivo", "subtipo": "pdf", "descripcion": "Ninguna" },
    { "nombre": "Acta de Nacimiento IMG", "requerido": true, "tipo": "archivo", "subtipo": "imagen", "descripcion": "Ninguna" },
    { "nombre": "Fecha egreso Min-Max", "requerido": true, "tipo": "fecha", "subtipo": "rango", "fechaMin": "2020-01-09T06:00:00.000Z", "fechaMax": "2020-01-23T06:00:00.000Z" },
    { "nombre": "Fecha egreso Min", "requerido": true, "tipo": "fecha", "subtipo": "rango", "fechaMin": "2020-01-09T06:00:00.000Z" },
    { "nombre": "Fecha egreso Max", "requerido": true, "tipo": "fecha", "subtipo": "rango", "fechaMax": "2020-01-23T06:00:00.000Z" }	
  ];

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
  nombreOpcion: FormControl;
  objectKeys = Object.keys;

  constructor(private _fb: FormBuilder, private toast: ToastrService, private _ads: AdministrarDocumentacionService) {
    BreadcrumbComponent.update(BC_ADMINISTRAR_DOCUMENTACION);
    this.initForm();
  }

  ngOnInit() {
    //this._ads.getDocumentos().subscribe( (documentos:TipoDato[]) => this.documentos.data = documentos ); //PRODUCCION
    this.documentos.data = this.listaRequisitos; // DEBUG
    this.opcMin.valueChanges.subscribe(valor => valor ? this.min.enable() : this.min.disable());
    this.opcMax.valueChanges.subscribe(valor => valor ? this.max.enable() : this.max.disable());
  }

  ngAfterViewInit() {
    this.updateTablaRequerimiento();
  }

  auxBoton() {
    this.updateTablaRequerimiento();
  }

  getNumero(index: number) {
    return new Numero(`Nombre ${index}`, true);
  }

  enableControles(arrayFormControl: any[]) {
    arrayFormControl.forEach(formControl => formControl.enable());
  }

  disableControles(arrayFormControl: any[]) {
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
        this.disableControles([this.descripcion, this.fechaMin, this.fechaMax, this.opciones]);
        break;
      }
      case this.OPC.ARCHIVO: {
        this.subtipos = EnumTipoDato.ARCHIVO.subtipos;
        this.tipoDescripcion = EnumTipoDato.ARCHIVO.descripcion;
        this.enableControles([this.descripcion]);
        this.disableControles([this.min, this.max, this.fechaMin, this.fechaMax, this.opciones]);
        this.offToggels([this.opcMin, this.opcMax]);
        break;
      }
      case this.OPC.SELECCION: {
        this.subtipos = EnumTipoDato.SELECCION.subtipos;
        this.tipoDescripcion = EnumTipoDato.SELECCION.descripcion;
        this.enableControles([this.opciones]);
        this.disableControles([this.min, this.max, this.descripcion, this.fechaMin, this.fechaMax]);
        this.offToggels([this.opcMin, this.opcMax]);
        break;
      }
      case this.OPC.FECHA: {
        this.subtipos = EnumTipoDato.FECHA.subtipos;
        this.tipoDescripcion = EnumTipoDato.FECHA.descripcion;
        this.enableControles([this.fechaMin, this.fechaMax]);
        this.disableControles([this.descripcion, this.min, this.max, this.opciones]);
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

  addOpcion() {
    let nombre = this.nombreOpcion.value;
    this.opciones.addControl(nombre, new FormControl(nombre, Validators.required));
  }

  deleteOpcion(nombre: string) {
    this.opciones.removeControl(nombre);
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
      this._ads.createDocumento(documento).then( () => {
        this.toast.success("Se agrego correctamente")
        this.updateTablaRequerimiento();
      }).catch( err => this.toast.error(err,'Error') );
      
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
      descripcion: [''],
      opciones: this._fb.group({

      })
    });
    this.opcMin = new FormControl(false);
    this.opcMax = new FormControl(false);
    this.nombreOpcion = new FormControl('', Validators.required);
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

  get opciones() {
    return this.fgGeneral.get('opciones') as FormGroup;
  }
}