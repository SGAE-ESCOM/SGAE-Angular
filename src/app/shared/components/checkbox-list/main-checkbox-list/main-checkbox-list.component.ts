import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-checkbox-list',
  templateUrl: './main-checkbox-list.component.html',
  styleUrls: ['./main-checkbox-list.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MainCheckboxListComponent),
      multi: true
    }
  ]
})
export class MainCheckboxListComponent implements OnInit, ControlValueAccessor {

  @Input() opciones: any[] = [];
  @Input() property:string = '';
  @Input() color:string = 'primary';
  
  value: any[] = [];
  isDisabled: boolean;

  onChange = (_: any) => { }
  onTouch = () => { }


  constructor() { }

  ngOnInit(): void {
  }

  /************************* OVERRIDE *******************/
  writeValue(value: any): void {
    if (value) {
      this.value = value || [];
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
}
