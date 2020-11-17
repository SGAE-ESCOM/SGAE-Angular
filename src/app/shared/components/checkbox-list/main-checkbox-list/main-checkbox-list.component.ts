import { Component, forwardRef, Input, OnChanges, SimpleChanges } from '@angular/core';
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
export class MainCheckboxListComponent implements OnChanges, ControlValueAccessor {

  @Input() opciones: any[] = [];
  @Input() property:string = '';
  @Input() color:string = 'primary';
  
  value: any[] = [];
  valueBoolean: Boolean[] = [];
  isDisabled: boolean;

  onChange = (_: any) => { }
  onTouch = () => { }


  constructor() { }
  
  ngOnChanges(changes: SimpleChanges): void {
    if(changes.opciones && this.opciones != null ){
      console.log("Hola desde onchanges");
      this.valueBoolean = new Array(this.opciones.length).fill(false);
    }
  }

  /************************* OVERRIDE *******************/
  writeValue(value: any): void {
    if (value) {
      //this.value = value || [];
      this.setValues(value);
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
  
  private setValues(array: any[]){
    console.log(this.opciones);
    console.log(array)
    let arrayAux = [];
    for(var i = 0; i< array.length; i++){
      for( var j =0; j < this.opciones.length; j++ ){
        if( Object.is( array[i], this.opciones[j] ) ){
          arrayAux.push( {index: j, value: this.opciones[j]});
          break;
        }
      }
    }
    arrayAux.forEach( element => {
      //this.value.push( element )
      this.valueBoolean[element.index] = true;
    });
    this.onChange(this.value);
  }
}
