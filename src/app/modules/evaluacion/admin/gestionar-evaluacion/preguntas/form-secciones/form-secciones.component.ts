import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Seccion } from '@models/evaluacion/evaluacion/seccion';
import { Tema } from '@models/evaluacion/evaluacion/tema';
import { SeccionesService } from '@services/evaluacion/secciones.service';
import { TemasService } from '@services/evaluacion/temas.service';
import { MSJ_ERROR_CONECTAR_SERVIDOR, MSJ_ERROR_REGEX_ALPHANUMERICO_CON_ESPACIOS_Y_PUNTUACION, MSJ_ERROR_REQUERIDO, MSJ_ERROR_VERIFICAR_FORM, MSJ_OK_AGREGADO, MSJ_OK_EDITADO } from '@shared/utils/mensajes';
import { REGEX_ALPHANUMERICO_CON_ESPACIOS_Y_PUNTUACION } from '@shared/utils/validators/regex';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-form-secciones',
  templateUrl: './form-secciones.component.html',
  styleUrls: ['./form-secciones.component.scss']
})
export class FormSeccionesComponent implements OnInit, OnChanges {

  @Input() opc:string = '';
  @Input() titulo:string = '';
  @Input() seccion: Seccion;
  @Output() cerrar: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() accion: EventEmitter<boolean> = new EventEmitter<boolean>();
  
  //STATIC
  MJS_ERROR_REGEX_ALPHANUMERICO_CON_ESPACIOS_Y_PUNTUACION = MSJ_ERROR_REGEX_ALPHANUMERICO_CON_ESPACIOS_Y_PUNTUACION;
  MJS_ERROR_REQUERIDO = MSJ_ERROR_REQUERIDO;
  
  fgSeccion: FormGroup;
  

  constructor(private fb: FormBuilder, private _toastr: ToastrService, private _secciones:SeccionesService) {
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.seccion && this.seccion != null) {
      this.initForm();
      this.setForm();
    }
  }

  /***************************** REST ******************************/
  save(form: FormGroup) {
    if (form.valid) {
      this._secciones.save(form.value).then(caso => {
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
      let seccion:Seccion = form.value;
      seccion.id = this.seccion.id;
      this._secciones.update(seccion).then(caso => {
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
  async initForm() {
    this.fgSeccion = this.fb.group({
      nombre: ['', [Validators.required, Validators.pattern(REGEX_ALPHANUMERICO_CON_ESPACIOS_Y_PUNTUACION)]] 
    })
  }

  async setForm() {
    this.nombre.setValue(this.seccion.nombre);
  }

  get nombre() { return this.fgSeccion.get('nombre') as FormControl }

}
