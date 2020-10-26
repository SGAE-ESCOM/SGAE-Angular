import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { MJS_ERROR_REGEX_ALPHANUMERICO_CON_ESPACIOS_Y_PUNTUACION, MJS_ERROR_REQUERIDO, MJS_ERROR_VERIFICAR_FORM} from '@shared/utils/mensajes';
import { REGEX_ALPHANUMERICO_CON_ESPACIOS_Y_PUNTUACION } from '@shared/utils/validators/regex';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-lista',
  templateUrl: './main-lista.component.html',
  styleUrls: ['./main-lista.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MainListaComponent),
      multi: true
    }
  ]
})
export class MainListaComponent implements OnInit, ControlValueAccessor {

  @Input() noDraggable:boolean = false;
  MJS_ERROR_REQUERIDO = MJS_ERROR_REQUERIDO;
  MJS_ERROR_REGEX_ALPHANUMERICO_CON_ESPACIOS_Y_PUNTUACION = MJS_ERROR_REGEX_ALPHANUMERICO_CON_ESPACIOS_Y_PUNTUACION;

  value: string[];
  isDisabled: boolean;
  fgLista: FormGroup;

  onChange = (_: any) => { }
  onTouch = () => { }

  constructor(private _toastr:ToastrService) {
    this.fgLista = new FormGroup({
      item: new FormControl('',[Validators.required, Validators.pattern(REGEX_ALPHANUMERICO_CON_ESPACIOS_Y_PUNTUACION)])
    })
  }

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

  agregar(){
    if(this.fgLista.valid){
      let repetidos = this.value.filter( item => item === this.item.value ).length;
      if(repetidos)
        this._toastr.error('Elemento repetido');
      else
        this.value.push(this.item.value);
    }else{
      this._toastr.error(MJS_ERROR_VERIFICAR_FORM);
    }
  }

  eliminar(index:number){
    this.value.splice(index, 1);
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.value, event.previousIndex, event.currentIndex);
  }
  
  ngOnInit(): void {
  }

  get item() { return this.fgLista.get('item') as FormControl}
}
