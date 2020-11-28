import { Component, forwardRef, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormControl, FormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { MSJ_ERROR_REGEX_ALPHANUMERICO_CON_ESPACIOS_Y_PUNTUACION, MSJ_ERROR_REQUERIDO } from '@shared/utils/mensajes';


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
  MSJ_ERROR_REGEX_ALPHANUMERICO_CON_ESPACIOS_Y_PUNTUACION = MSJ_ERROR_REGEX_ALPHANUMERICO_CON_ESPACIOS_Y_PUNTUACION;

  @Input() titulo: string = "";
  @Input() error: boolean = false;
  
  value: any[] = [];
  valueBoolean: Boolean[] = [];
  isDisabled: boolean;

  fgFormFecha: FormGroup;
  
  hora: FormControl = new FormControl('0', [Validators.required])
  minutos: FormControl = new FormControl('0', [Validators.required])

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
      //this.value = value || [];
      //this.setValues(value);
    } else {
      this.value = [];
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
  updateValue(checked:boolean, opcion: any){
    if(checked){
      this.value.push(opcion);
    }else{
      for(var i = 0; i< this.value.length; i++){
        if( Object.is( this.value[i], opcion ) ){
          this.value.splice(i, 1);
          break;
        }
      }
    }
    this.onChange(this.value);
  }
  
  changeValue(opcion: any, index: number){
    this.valueBoolean[index] = !this.valueBoolean[index];
    if(this.valueBoolean[index]){
      this.value.push(opcion);
    }else{
      for(var i = 0; i< this.value.length; i++){
        if( Object.is( this.value[i], opcion ) ){
          this.value.splice(i, 1);
          break;
        }
      }
    }
    this.onChange(this.value);
  }

  /*************************** INIT *****************************/
  initForm(){
    this.fgFormFecha = this.fb.group({
      
    })
  }

}
