import { Component, EventEmitter, forwardRef, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormControl, FormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { FechaAplicacion } from '@models/evaluacion/fecha-aplicacion';
import { fadeInLeft, fadeInRight } from '@shared/utils/animations/router.animations';
import { MSJ_ERROR_REGEX_ALPHANUMERICO_CON_ESPACIOS_Y_PUNTUACION, MSJ_ERROR_REQUERIDO, MSJ_ERROR_VERIFICAR_FORM } from '@shared/utils/mensajes';
import { momentJS } from '@shared/utils/traduccion/moment';
import { groupByOnly } from '@shared/utils/utils-grupos';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-lista-grupos-aplicacion',
  templateUrl: './lista-grupos-aplicacion.component.html',
  styleUrls: ['./lista-grupos-aplicacion.component.scss'],
  animations: [fadeInRight(), fadeInLeft()],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ListaGruposAplicacionComponent),
      multi: true
    }
  ]
})
export class ListaGruposAplicacionComponent implements OnChanges, ControlValueAccessor {

  @Input() gruposCat = [];
  @Input() error:Boolean = false;
  @Output('isMain') isMainEE: EventEmitter<Boolean> = new EventEmitter<Boolean>();

  MJS_ERROR_REQUERIDO = MSJ_ERROR_REQUERIDO;
  MJS_ERROR_REGEX_ALPHANUMERICO_CON_ESPACIOS_Y_PUNTUACION = MSJ_ERROR_REGEX_ALPHANUMERICO_CON_ESPACIOS_Y_PUNTUACION;

  gruposObj: any = {};
  value: any = {};
  valueArray: any[] = [];
  isMain: Boolean = true;
  isDisabled: boolean;
  fgLista: FormGroup;
  fechaAplicacion: FechaAplicacion;
  entries = Object.entries;

  onChange = (_: any) => { }
  onTouch = () => { }

  constructor(private fb: FormBuilder, private _toastr: ToastrService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.gruposCat && this.gruposCat != null) {
      this.initForm();
      this.gruposObj = groupByOnly(this.gruposCat, 'id');
    }
  }

  writeValue(value: any): void {
    if (value) {
      this.value = value || {};
      this.valueArray = Object.entries( this.value );
    } else {
      this.value = {};
      this.valueArray = Object.entries( this.value );
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  /**********************************  ACCIONES  **********************************/
  agregar() {
    if (this.fgLista.valid) {
      if(this.value[this.grupo.value]){
        this._toastr.error("Ya hay una fecha para este grupo");
      }else{
        this.value[this.grupo.value] = { grupo: this.grupo.value, fechaInicio: this.fechaInicio.value, fechaTermino: this.fechaTermino.value };
        this.updateValueArray();
      }
    } else {
      this._toastr.error(MSJ_ERROR_VERIFICAR_FORM);
    }
  }

  editarItem() {
    if (this.fgLista.valid) {
      this.value[this.grupo.value].fechaInicio = this.fechaInicio.value;
      this.value[this.grupo.value].fechaTermino = this.fechaTermino.value;
      this.updateValueArray();
      this.grupo.enable();
      this.isMain = true;
      this.isMainEE.emit(this.isMain);
    } else {
      this._toastr.error(MSJ_ERROR_VERIFICAR_FORM);
    }
  }

  eliminar(property: string) {
    delete this.value[property]
    this.updateValueArray();
  }

  editar(fechaAplicacion: FechaAplicacion) {
    this.fechaAplicacion = fechaAplicacion;
    this.isMain = false;
    this.isMainEE.emit(this.isMain);
    //Set el Formulario para editar
    this.grupo.setValue(this.fechaAplicacion.grupo);
    this.grupo.disable();
    this.fechaInicio.setValue(this.fechaAplicacion.fechaInicio);
    this.fechaTermino.setValue(this.fechaAplicacion.fechaTermino);
  }

  cancelarActualizar() {
    this.isMain = true;
    this.grupo.enable();
    this.isMainEE.emit(this.isMain);
  }

  /*************************************  UTILS  *********************************************/
  initForm() {
    this.fgLista = this.fb.group({
      grupo: ['', [Validators.required]],
      fechaInicio: ['', [Validators.required]],
      fechaTermino: ['', [Validators.required]],
    })
  }

  updateValueArray(){
    this.valueArray = Object.entries( this.value );
    this.valueArray.forEach( ([key, fechaAplicacion ]) => { 
      fechaAplicacion.fechaInicioF = momentJS(fechaAplicacion.fechaInicio).format('Do MMMM YYYY');
      fechaAplicacion.fechaTerminoF = momentJS(fechaAplicacion.fechaTermino).format('Do MMMM YYYY');
    });
  }

  /***************************************** GETTERS **********************************/
  get grupo() { return this.fgLista.get('grupo') as FormControl }
  get fechaInicio() { return this.fgLista.get('fechaInicio') as FormControl }
  get fechaTermino() { return this.fgLista.get('fechaTermino') as FormControl }

}
