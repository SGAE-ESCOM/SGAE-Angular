import { Component, forwardRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Seccion } from '@models/evaluacion/evaluacion/seccion';

@Component({
  selector: 'app-lista-temas',
  templateUrl: './lista-temas.component.html',
  styleUrls: ['./lista-temas.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ListaTemasComponent),
      multi: true
    }
  ]
})
export class ListaTemasComponent implements OnChanges, ControlValueAccessor {

  @Input() temas: any[] = [];
  @Input() secciones:Seccion[] = [];
  seccionesObj: any;
  @Input() property:string = '';
  @Input() property2:string = '';
  @Input() color:string = 'primary';
  @Input() error: boolean = false;
  
  value: any[] = [];
  valueBoolean: Boolean[] = [];
  isDisabled: boolean;

  onChange = (_: any) => { }
  onTouch = () => { }


  constructor() { }
  
  ngOnChanges(changes: SimpleChanges): void {
    if(changes.temas && this.temas != null ){
      this.valueBoolean = new Array(this.temas.length).fill(false);
      this.temas = this.ordenaTemas();
      this.seccionesObj = this.groupBy(this.secciones, 'id');
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

  private setValues(array: any[]){
    let arrayAux = [];
    for(var i = 0; i< array.length; i++){
      for( var j =0; j < this.temas.length; j++ ){
        if(  array[i].id === this.temas[j].id ){
          arrayAux.push( {index: j, value: this.temas[j]});
          break;
        }
      }
    }
    arrayAux.forEach( element => {
      this.valueBoolean[element.index] = true;
      this.value.push(element.value);
    });
    this.onChange(this.value);
  }

  /**************************************** UTILS ***************************************************/
  private ordenaTemas() {
    let ordenados = this.groupBy(this.temas, 'idSeccion');
    return Object.entries(ordenados).reduce( (prev, [key,value]) => {
      prev = prev.concat(value);
      return prev;
    }, [] );
  }

  private groupBy( list: any[], property: string): any {
    return list.reduce( (prev, current ) => { 
      let key = current[property];
      if( !prev[key] )
        prev[key] = [];
      prev[key].push( current );
      return prev;
    } , {});
  }
  
}
