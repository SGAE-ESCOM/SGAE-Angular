import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormControl, FormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { Opcion, Pregunta } from '@models/evaluacion/evaluacion/pregunta';
import { fadeInLeft, fadeInRight } from '@shared/utils/animations/router.animations';
import { MSJ_ERROR_REGEX_ALPHANUMERICO_CON_ESPACIOS_Y_PUNTUACION, MSJ_ERROR_REQUERIDO, MSJ_ERROR_VERIFICAR_FORM } from '@shared/utils/mensajes';
import { REGEX_ALPHANUMERICO_CON_ESPACIOS_Y_PUNTUACION } from '@shared/utils/validators/regex';
import { kMaxLength } from 'buffer';
import { ToastrService } from 'ngx-toastr';
import { element } from 'protractor';

@Component({
  selector: 'app-lista-opciones',
  templateUrl: './lista-opciones.component.html',
  styleUrls: ['./lista-opciones.component.scss'],
  animations: [fadeInRight(), fadeInLeft()],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ListaOpcionesComponent),
      multi: true
    }
  ],
})
export class ListaOpcionesComponent implements ControlValueAccessor {

  @Input() noDraggable:boolean = false;
  @Output('isMain') isMainEE: EventEmitter<Boolean> = new EventEmitter<Boolean>();

  MJS_ERROR_REQUERIDO = MSJ_ERROR_REQUERIDO;
  MJS_ERROR_REGEX_ALPHANUMERICO_CON_ESPACIOS_Y_PUNTUACION = MSJ_ERROR_REGEX_ALPHANUMERICO_CON_ESPACIOS_Y_PUNTUACION;
  
  value: Opcion[] = [];
  isMain: Boolean = true;
  isDisabled: boolean;
  fgLista: FormGroup;
  opcion: Opcion;

  onChange = (_: any) => { }
  onTouch = () => { }

  constructor(private fb:FormBuilder, private _toastr:ToastrService) {
    this.fgLista = this.fb.group({
      item: ['',[Validators.required]],
      img: ['']
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

  /**********************************  ACCIONES  **********************************/
  agregar(){
    if(this.fgLista.valid){
      this.value.push({id:this.value.length, enunciado: this.item.value, img: this.img.value});
    }else{
      this._toastr.error(MSJ_ERROR_VERIFICAR_FORM);
    }
  }

  editarItem(){
    if(this.fgLista.valid){
      for(var i = 0; i < this.value.length; i++){
        if(this.value[i].id == this.opcion.id){
          this.value[i].enunciado = this.item.value;
          if(this.img.value)
            this.value[i].img = this.img.value;
        }
      }
      this.isMain = true;
      this.isMainEE.emit(this.isMain);
    }else{
      this._toastr.error(MSJ_ERROR_VERIFICAR_FORM);
    }
  }

  eliminar(index:number){
    this.value.splice(index, 1);
    this.reordenar();
  }

  editar(opcion: Opcion){
    this.opcion = opcion;
    this.isMain = false;
    this.isMainEE.emit(this.isMain);
    this.item.setValue( this.opcion.enunciado );
    this.img.setValue( this.opcion.img );
  }

  cancelarActualizar(){
    this.isMain = true;
    this.isMainEE.emit(this.isMain);
  }
  
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.value, event.previousIndex, event.currentIndex);
  }
  

  /*************************************  UTILS  *********************************************/
  reordenar(){
    for(var i = 0; i < this.value.length; i++){
      this.value[i].id = i;
    }
  }

  handleUpload(event: any, documento) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        /*let jsonFile = {
          nombre: file.name,
          archivo: reader.result
        };*/
        this.fgLista.get(documento).patchValue(reader.result);
      };
    }
  }

  /***************************************** GETTERS **********************************/
  get item() { return this.fgLista.get('item') as FormControl}
  get img() { return this.fgLista.get('img') as FormControl}

}
