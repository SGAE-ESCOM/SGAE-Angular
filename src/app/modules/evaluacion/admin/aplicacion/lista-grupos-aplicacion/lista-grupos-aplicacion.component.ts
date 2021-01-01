import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, forwardRef, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormControl, FormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { FechaAplicacion } from '@models/evaluacion/fecha-aplicacion';
import { fadeInLeft, fadeInRight } from '@shared/utils/animations/router.animations';
import { MSJ_ERROR_REGEX_ALPHANUMERICO_CON_ESPACIOS_Y_PUNTUACION, MSJ_ERROR_REQUERIDO, MSJ_ERROR_VERIFICAR_FORM } from '@shared/utils/mensajes';
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
  @Output('isMain') isMainEE: EventEmitter<Boolean> = new EventEmitter<Boolean>();

  MJS_ERROR_REQUERIDO = MSJ_ERROR_REQUERIDO;
  MJS_ERROR_REGEX_ALPHANUMERICO_CON_ESPACIOS_Y_PUNTUACION = MSJ_ERROR_REGEX_ALPHANUMERICO_CON_ESPACIOS_Y_PUNTUACION;

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
    }
  }

  writeValue(value: any): void {
    if (value) {
      this.value = value || {};
    } else {
      this.value = {};
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
      this.value[this.grupo.value.id] = { grupo: this.grupo.value, fechaInicio: this.fechaInicio.value, fechaTermino: this.fechaTermino.value };
      this.valueArray = Object.entries( this.value );
    } else {
      this._toastr.error(MSJ_ERROR_VERIFICAR_FORM);
    }
  }

  editarItem() {
    if (this.fgLista.valid) {
      /* for (var i = 0; i < this.value.length; i++) {
        if (this.value[i].id == this.fechaAplicacion.id) {
          this.value[i].grupo = this.fechaAplicacion.grupo;
          this.value[i].fechaInicio = this.fechaAplicacion.fechaInicio;
          this.value[i].fechaTermino = this.fechaAplicacion.fechaTermino;
        }
      } */
      this.isMain = true;
      this.isMainEE.emit(this.isMain);
    } else {
      this._toastr.error(MSJ_ERROR_VERIFICAR_FORM);
    }
  }

  eliminar(index: number) {
    //this.value.splice(index, 1);
    //this.reordenar();
  }

  editar(fechaAplicacion: FechaAplicacion) {
    this.fechaAplicacion = fechaAplicacion;
    this.isMain = false;
    this.isMainEE.emit(this.isMain);
    this.grupo.setValue(this.fechaAplicacion.grupo);
    this.fechaInicio.setValue(this.fechaAplicacion.fechaInicio);
    this.fechaTermino.setValue(this.fechaAplicacion.fechaTermino);
  }

  cancelarActualizar() {
    this.isMain = true;
    this.isMainEE.emit(this.isMain);
  }

  /*************************************  UTILS  *********************************************/
  initForm() {
    this.fgLista = this.fb.group({
      grupo: ['', [Validators.required]],
      fechaInicio: ['01-01-2021', [Validators.required]],
      fechaTermino: ['01-01-2021', [Validators.required]],
    })
  }

  /* reordenar() {
    for (var i = 0; i < this.value.length; i++) {
      this.value[i].id = i;
    }
  } */

  /***************************************** GETTERS **********************************/
  get grupo() { return this.fgLista.get('grupo') as FormControl }
  get fechaInicio() { return this.fgLista.get('fechaInicio') as FormControl }
  get fechaTermino() { return this.fgLista.get('fechaTermino') as FormControl }

}
