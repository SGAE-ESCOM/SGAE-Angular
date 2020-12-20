import { Component, forwardRef, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormControl, FormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'input-fecha',
  templateUrl: './main-input-fecha.component.html',
  styleUrls: ['./main-input-fecha.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MainInputFechaComponent),
      multi: true
    }
  ]
})
export class MainInputFechaComponent implements OnChanges, ControlValueAccessor {

  @Input() label: string = 'Fecha';
  @Input() error: boolean = false;
  @Input() minDate: Date = new Date();
  
  value: number;
  valueBoolean: Boolean[] = [];
  isDisabled: boolean;

  fgFormFecha: FormGroup;
  fechaInput: FormControl = new FormControl('');

  onChange = (_: any) => { }
  onTouch = () => { }


  constructor(private fb: FormBuilder) {
    
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    if( changes.minDate && this.minDate){
      this.minDate = new Date(this.minDate);
    }
  }

  /************************* OVERRIDE *******************/
  writeValue(value: any): void {
    if (value) {
      this.value = value || '';
      this.fechaInput.setValue(new Date(this.value) );
    } else {
      this.value = new Date().getTime();
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
  addEvent(type: string, event: MatDatepickerInputEvent<Date>){
    if(event.value){
      this.value = event.value.valueOf();
    }else{
      this.value = null;
      this.fechaInput.setErrors({ invalid: true });
    }
    this.onChange(this.value);
  }

}
