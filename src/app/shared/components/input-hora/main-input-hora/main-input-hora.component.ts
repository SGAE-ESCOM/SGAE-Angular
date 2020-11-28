import { Component, forwardRef, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormControl, FormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { MSJ_ERROR_REQUERIDO, MSJ_MINUTOS_NO_VALIDAS, MSJ_HORAS_NO_VALIDAS } from '@shared/utils/mensajes';
import { REGEX_NUMEROS_MINUTOS, REGEX_NUMEROS_HORAS } from '@shared/utils/validators/regex';

@Component({
  selector: 'input-hora',
  templateUrl: './main-input-hora.component.html',
  styleUrls: ['./main-input-hora.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MainInputHoraComponent),
      multi: true
    }
  ]
})
export class MainInputHoraComponent implements OnChanges, ControlValueAccessor {

  MSJ_ERROR_REQUERIDO = MSJ_ERROR_REQUERIDO;
  MSJ_HORAS_NO_VALIDAS = MSJ_HORAS_NO_VALIDAS;
  MSJ_MINUTOS_NO_VALIDAS = MSJ_MINUTOS_NO_VALIDAS;


  @Input() titulo: string = "";
  @Input() error: boolean = false;

  value: string = '';
  valueBoolean: Boolean[] = [];
  isDisabled: boolean;

  fgFormFecha: FormGroup;

  hora: FormControl = new FormControl('0', [Validators.required, Validators.pattern(REGEX_NUMEROS_HORAS)])
  minutos: FormControl = new FormControl('0', [Validators.required, Validators.pattern(REGEX_NUMEROS_MINUTOS), Validators.max(60)])

  onChange = (_: any) => { }
  onTouch = () => { }


  constructor(private fb: FormBuilder) {
    this.initForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    /* if(changes.evaluaciones && this.evaluaciones != null ){
      this.valueBoolean = new Array(this.evaluaciones.length).fill(false);
      //this.evaluaciones = this.ordenaTemas();
      //this.seccionesObj = this.groupBy(this.secciones, 'id');
    } */
  }

  /************************* OVERRIDE *******************/
  writeValue(value: any): void {
    if (value) {
      this.value = value || '';
      this.setValue();
    } else {
      this.value = '';
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

  /********************** UTILS **********************/
  updateValue() {
    if (this.hora.valid && this.minutos.valid) {
      this.value = this.hora.value + ':' + this.minutos.value
    } else {
      this.value = '';
    }
    this.onChange(this.value);
  }

  setValue() {
    if (this.value !== '') {
      let time = this.value.split(":");
      this.hora.setValue(time[0]);
      this.minutos.setValue(time[1])
    }
    this.onChange(this.value);
  }

  /*************************** INIT *****************************/
  initForm() {
    this.fgFormFecha = this.fb.group({

    })
  }

}
