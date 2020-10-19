import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Grupo } from '@models/evaluacion/Grupo';
import { GruposService } from '@services/evaluacion/grupos.service';
import { ALPHANUMERICO_CON_ESPACIOS } from '@shared/utils/validators/regex';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-form-grupos',
  templateUrl: './form-grupos.component.html',
  styleUrls: ['./form-grupos.component.scss']
})
export class FormGruposComponent implements OnInit, OnChanges{

  @Input() opc:string;
  @Input() grupo: Grupo;
  @Output() cerrar: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() accion: EventEmitter<boolean> = new EventEmitter<boolean>();

  fgGrupo: FormGroup;

  constructor(private fb:FormBuilder, private _grupos:GruposService, private _toastr: ToastrService) { }
 
  ngOnInit(): void {
    this.fgGrupo = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(50), Validators.pattern(ALPHANUMERICO_CON_ESPACIOS)]]
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.grupo && this.grupo != null ){
      console.log(changes);
      console.log(this.fgGrupo)
      this.fgGrupo.get('nombre').setValue(this.grupo.nombre);
    }
  }


  save(form:FormGroup){
    if( form.valid){
      this._grupos.save(form.value).then( caso => { 
        this._toastr.success("Agregado correctamente");
        this.accion.emit(true);
      }, err => {
        this._toastr.error("Ha ocurrido un error");
      });
    }else{
      this._toastr.error("Debes agregar un nombre");
    }
  }

  update(form: FormGroup){
    if( form.valid){
      this._grupos.update(form.value).then( caso => { 
        this._toastr.success("Actualizado correctamente");
        this.accion.emit(true);
      }, err => {
        this._toastr.error("Ha ocurrido un error");
      });
    }else{
      this._toastr.error("Debes agregar un nombre");
    }
  }
  
  cerrarModal(){
    this.cerrar.emit(true);
  }

}
