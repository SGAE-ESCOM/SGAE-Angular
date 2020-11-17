import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Seccion } from '@models/evaluacion/evaluacion/seccion';
import { Tema } from '@models/evaluacion/evaluacion/tema';
import { TemasService } from '@services/evaluacion/temas.service';
import { MSJ_ERROR_CONECTAR_SERVIDOR, MSJ_ERROR_REGEX_ALPHANUMERICO_CON_ESPACIOS_Y_PUNTUACION, MSJ_ERROR_REQUERIDO, MSJ_ERROR_VERIFICAR_FORM, MSJ_OK_AGREGADO, MSJ_OK_EDITADO } from '@shared/utils/mensajes';
import { REGEX_ALPHANUMERICO_CON_ESPACIOS_Y_PUNTUACION } from '@shared/utils/validators/regex';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-form-temas',
  templateUrl: './form-temas.component.html',
  styleUrls: ['./form-temas.component.scss']
})
export class FormTemasComponent implements OnInit, OnChanges {
  
  @Input() opc:string = '';
  @Input() tema: Tema;
  @Input() seccion: Seccion;
  @Input() titulo:string = '';
  @Output() cerrar: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() accion: EventEmitter<boolean> = new EventEmitter<boolean>();
  
  //STATIC
  MJS_ERROR_REGEX_ALPHANUMERICO_CON_ESPACIOS_Y_PUNTUACION = MSJ_ERROR_REGEX_ALPHANUMERICO_CON_ESPACIOS_Y_PUNTUACION;
  MJS_ERROR_REQUERIDO = MSJ_ERROR_REQUERIDO;
  
  fgTema: FormGroup;
  

  constructor(private fb: FormBuilder, private _toastr: ToastrService, private _temas:TemasService) {
    
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.tema && this.tema != null) {
      this.initForm();
      this.setForm();
    }
  }

  /***************************** REST ******************************/
  save(form: FormGroup) {
    if (form.valid) {
      let tema: Tema = form.value;
      tema.idSeccion = this.seccion.id;
      tema.total = 0;
      this._temas.save(tema).then(caso => {
        this._toastr.success(MSJ_OK_AGREGADO);
        this.accion.emit(true);
      }, err => {
        this._toastr.error(MSJ_ERROR_CONECTAR_SERVIDOR);
      });
    } else {
      this._toastr.error(MSJ_ERROR_VERIFICAR_FORM);
    }
  }

  update(form: FormGroup) {
    if (form.valid) {
      let tema:Tema = form.value;
      tema.id = this.tema.id;
      tema.idSeccion = this.seccion.id;
      tema.total = this.tema.total;
      this._temas.update(tema).then(caso => {
        this._toastr.success(MSJ_OK_EDITADO);
        this.accion.emit(true);
      }, err => {
        this._toastr.error(MSJ_ERROR_CONECTAR_SERVIDOR);
      });
    } else {
      this._toastr.error(MSJ_ERROR_VERIFICAR_FORM);
    }
  }

  cerrarModal() {
    this.cerrar.emit(true);
  }

  /***************************** UTILS ******************************/
  initForm() {
    this.fgTema = this.fb.group({
      nombre: ['', [Validators.required, Validators.pattern(REGEX_ALPHANUMERICO_CON_ESPACIOS_Y_PUNTUACION)]],
    })
  }

  setForm(){
    this.nombre.setValue(this.tema.nombre);
  }

  get nombre() { return this.fgTema.get('nombre') as FormControl }
}