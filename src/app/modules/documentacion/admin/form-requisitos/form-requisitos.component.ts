import { Component, OnInit, EventEmitter, Output, OnChanges, SimpleChanges, Input } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ALPHANUMERICO_CON_ESPACIOS, REGEX_MAYUSCULAS, REGEX_MINUSCULAS, REGEX_NUMEROS } from '@shared/validators/regex';
import { fadeInDown, fadeInOutDown, fadeInOutLeft } from '@shared/animations/router.animations';
import { TipoDato } from '@models/documentacion/tipo-dato';
import { EnumTipoDato, OPC_TIPO_DATO } from '@models/documentacion/enums/enum-tipo-dato.enum';
import { OPC_CAMPO } from '@models/documentacion/enums/enum-tipo-campo.enum';

@Component({
  selector: 'app-form-requisitos',
  templateUrl: './form-requisitos.component.html',
  styleUrls: ['./form-requisitos.component.scss'],
  animations: [fadeInDown(), fadeInOutDown(), fadeInOutLeft()]
})
export class FormRequisitosComponent implements OnInit, OnChanges {

  @Input() requisito: TipoDato;
  @Input() tipoForm: string;
  @Output() enviarForm = new EventEmitter<FormGroup>();
  @Output() cancelarForm = new EventEmitter<any>();

  //Variables OPCIONES DISPONIBLES
  public readonly OPC = OPC_TIPO_DATO;
  public readonly OPC_CAMPO = OPC_CAMPO;

  //Variables para los TipoDato Generales
  tipoOpcion: string = "";
  tipos: any = EnumTipoDato.ALL;
  tipoDescripcion: string;
  subtipos: any;
  subtiposDescripcion: string;

  //Variables de caracteristicas para el formulario
  fgGeneral: FormGroup;
  opcMin = new FormControl(false);
  opcMax = new FormControl(false);
  opcLetraMayuscula = new FormControl(true);
  opcLetraMinuscula = new FormControl(true);
  opcNumeros = new FormControl(true);
  opcEspacios = new FormControl(false);
  opcExpresionRegular = new FormControl(false);
  nombreOpcion = new FormControl('', Validators.required);
  objectKeys = Object.keys;

  constructor(private _fb: FormBuilder) {
    this.initForm();
  }

  ngOnInit(): void {
    this.opcMin.valueChanges.subscribe(valor => valor ? this.min.enable() : this.min.disable());
    this.opcMax.valueChanges.subscribe(valor => valor ? this.max.enable() : this.max.disable());
    this.opcLetraMayuscula.valueChanges.subscribe(valor => valor ? this.addExpresion(REGEX_MAYUSCULAS) : this.removeExpresion(REGEX_MAYUSCULAS));
    this.opcLetraMinuscula.valueChanges.subscribe(valor => valor ? this.addExpresion(REGEX_MINUSCULAS) : this.removeExpresion(REGEX_MINUSCULAS));
    this.opcNumeros.valueChanges.subscribe(valor => valor ? this.addExpresion(REGEX_NUMEROS) : this.removeExpresion(REGEX_NUMEROS));
    this.opcExpresionRegular.valueChanges.subscribe(
      valor => valor ?
        this.disableControles([this.opcEspacios]) : this.enableControles([this.opcEspacios]));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['requisito'] && this.requisito != null) {
      this.llenarFormulario(this.requisito);
    }
  }

  //Envio de datos
  enviarFormulario() {
    this.setFormatoDateTime(this.fgGeneral.value);
    this.enviarForm.emit(this.fgGeneral);
  }

  cancelar(){
    this.cancelarForm.emit('');
  }

  //Funciones de control
  enableControles(arrayFormControl: any[]) {
    arrayFormControl.forEach(formControl => formControl.enable());
  }

  disableControles(arrayFormControl: any[]) {
    arrayFormControl.forEach(formControl => formControl.disable());
  }

  addExpresion(expresion: string) {
    let nuevaExpresion = this.expresionValor.value + expresion;
    this.expresionValor.patchValue(nuevaExpresion);
  }

  removeExpresion(expresion: string) {
    let nuevaExpresion = this.expresionValor.value.replace(expresion, '');
    this.expresionValor.patchValue(nuevaExpresion);
  }

  offToggels(arrayFormControl: FormControl[]) {
    arrayFormControl.forEach(formControl => { formControl.patchValue(false) });
  }

  addOpcion(nombre) {
    this.opciones.addControl(nombre, new FormControl(nombre, Validators.required));
  }

  deleteOpcion(nombre: string) {
    this.opciones.removeControl(nombre);
  }

  verificarRegex(expresion: string) {
    try {
      let regex = new RegExp(expresion);
    } catch (error) {
      this.expresionValor.setErrors({ 'incorrect': true });
    }
  }

  //Eventos
  onChangeSubtipo(subtipoSelected) {
    switch (subtipoSelected) {
      case OPC_CAMPO.TEXTO: {
        this.enableControles([this.expresionRegular]);
        break;
      }
      default: {
        this.disableControles([this.expresionRegular]);
        break;
      }
    }
  }

  onChangeTipo(tipoSelected: string) {
    switch (tipoSelected) {
      case this.OPC.CAMPO: {
        this.subtipos = EnumTipoDato.CAMPO.subtipos;
        this.tipoDescripcion = EnumTipoDato.CAMPO.descripcion;
        //this.enableControles([this.expresionRegular]);
        this.disableControles([this.descripcion, this.fechaMin, this.fechaMax, this.opciones]);
        break;
      }
      case this.OPC.ARCHIVO: {
        this.subtipos = EnumTipoDato.ARCHIVO.subtipos;
        this.tipoDescripcion = EnumTipoDato.ARCHIVO.descripcion;
        this.enableControles([this.descripcion]);
        this.disableControles([this.min, this.max, this.expresionRegular, this.fechaMin, this.fechaMax, this.opciones]);
        this.offToggels([this.opcMin, this.opcMax, this.opcEspacios, this.opcExpresionRegular]);
        break;
      }
      case this.OPC.SELECCION: {
        this.subtipos = EnumTipoDato.SELECCION.subtipos;
        this.tipoDescripcion = EnumTipoDato.SELECCION.descripcion;
        this.enableControles([this.opciones]);
        this.disableControles([this.min, this.max, this.expresionRegular, this.descripcion, this.fechaMin, this.fechaMax]);
        this.offToggels([this.opcMin, this.opcMax, this.opcEspacios, this.opcExpresionRegular]);
        break;
      }
      case this.OPC.FECHA: {
        //this.subtipos = EnumTipoDato.FECHA.subtipos;
        //this.tipoDescripcion = EnumTipoDato.FECHA.descripcion;
        this.enableControles([this.fechaMin, this.fechaMax]);
        this.disableControles([this.descripcion, this.min, this.max, this.expresionRegular, this.opciones]);
        this.offToggels([this.opcMin, this.opcMax, this.opcEspacios, this.opcExpresionRegular]);
        break;
      }
      default: {
        break;
      }
    }
    this.subtipo.setValue('');
    this.tipoOpcion = tipoSelected;
  }

  //FormGroup
  initForm() {
    this.fgGeneral = this._fb.group({
      nombre: ['', [Validators.required, Validators.pattern(ALPHANUMERICO_CON_ESPACIOS)]],
      requerido: [true, Validators.required],
      tipo: ['', Validators.required],
      subtipo: ['', Validators.required],
      min: [{ value: 0, disabled: true }, Validators.required],
      max: [{ value: 0, disabled: true }, Validators.required],
      expresionRegular: this._fb.group({
        espacios: this.opcEspacios,
        valor: ['a-zá-úA-ZÁ-Ú0-9', Validators.required]
      }),
      fechaMin: ['', Validators.required],
      fechaMax: ['', Validators.required],
      descripcion: [''],
      opciones: this._fb.group({})
    });
  }

  llenarFormulario(requisito) {
    this.nombre.setValue(requisito.nombre);
    this.requerido.setValue(requisito.requerido);
    this.tipo.patchValue(requisito.tipo);
    this.onChangeTipo(requisito.tipo);
    this.subtipo.patchValue(requisito.subtipo);
    this.onChangeSubtipo(requisito.subtipo)
    switch (requisito.tipo) {
      case OPC_TIPO_DATO.CAMPO: {
        if (requisito.min != null) {
          this.opcMin.setValue(true); this.min.enable(); this.min.setValue(requisito.min);
        }
        if (requisito.max != null) {
          this.opcMax.setValue(true); this.max.enable(); this.max.setValue(requisito.max);
        }
        if (requisito.subtipo == OPC_CAMPO.TEXTO) {
          this.offToggels([this.opcLetraMayuscula, this.opcLetraMinuscula, this.opcNumeros]);
          let expresion: string = requisito.expresionRegular.valor;
          if (requisito.expresionRegular.espacios != null) {
            if (expresion.includes(REGEX_MAYUSCULAS)) {
              this.opcLetraMayuscula.setValue(true);
            } if (expresion.includes(REGEX_MINUSCULAS)) {
              this.opcLetraMinuscula.setValue(true);
            } if (expresion.includes(REGEX_NUMEROS)) {
              this.opcNumeros.setValue(true);
            }
            if (requisito.expresionRegular.espacios) {
              this.opcEspacios.setValue(true);
            }
          } else {
            this.disableControles([this.opcEspacios]);
            this.opcExpresionRegular.setValue(true);
          }
          this.expresionValor.setValue(expresion);
        }
        break;
      }
      case OPC_TIPO_DATO.ARCHIVO: {
        this.descripcion.setValue(requisito.descripcion);
        break;
      }
      case OPC_TIPO_DATO.SELECCION: {
        Object.entries(requisito.opciones).forEach( ([opcion, valor]) => {
          this.addOpcion(opcion)
        });
        break;
      }
      case OPC_TIPO_DATO.FECHA: {
        this.fechaMin.setValue( new Date( requisito.fechaMin ) );
        this.fechaMax.setValue( new Date( requisito.fechaMax ) );
        break;
      }
      default: {
        break;
      }
    }
  }

  /* Getters de FormControls */
  get nombre() { return this.fgGeneral.get('nombre') as FormControl; }
  get requerido() { return this.fgGeneral.get('requerido') as FormControl; }
  get tipo() { return this.fgGeneral.get('tipo') as FormControl; }
  get subtipo() { return this.fgGeneral.get('subtipo') as FormControl; }
  get min() { return this.fgGeneral.get('min') as FormControl; }
  get max() { return this.fgGeneral.get('max') as FormControl; }
  get expresionRegular() { return this.fgGeneral.get('expresionRegular') as FormGroup; }
  get expresionValor() { return this.fgGeneral.get('expresionRegular').get('valor') as FormControl; }
  get fechaMin() { return this.fgGeneral.get('fechaMin') as FormControl; }
  get fechaMax() { return this.fgGeneral.get('fechaMax') as FormControl; }
  get descripcion() { return this.fgGeneral.get('descripcion') as FormControl; }
  get opciones() { return this.fgGeneral.get('opciones') as FormGroup; }
  
  /* Utilerias */
  /**
   * Cambia el valor por default del mat-datepicker a un 
   * new Date().getTime()
   * @param requisito 
   */
  private setFormatoDateTime(requisito: any){
    if(requisito.tipo === this.OPC.FECHA){
      requisito.fechaMin = new Date(requisito.fechaMin).getTime();
      requisito.fechaMax = new Date(requisito.fechaMax).getTime();
    }
  }
}
