import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Aplicacion } from '@models/evaluacion/aplicacion';
import { Evaluacion } from '@models/evaluacion/evaluacion';
import { Tema } from '@models/evaluacion/evaluacion/tema';
import { Grupo } from '@models/evaluacion/Grupo';
import { AplicacionService } from '@services/evaluacion/aplicacion.service';
import { fadeInOutDown } from '@shared/utils/animations/router.animations';
import { MSJ_ERROR_CONECTAR_SERVIDOR, MSJ_ERROR_REGEX_ALPHANUMERICO_CON_ESPACIOS_Y_PUNTUACION, MSJ_ERROR_REQUERIDO, MSJ_ERROR_VERIFICAR_FORM, MSJ_OK_AGREGADO, MSJ_OK_EDITADO } from '@shared/utils/mensajes';
import { REGEX_ALPHANUMERICO_CON_ESPACIOS_Y_PUNTUACION, NUMEROS_SIN_ESPACIOS } from '@shared/utils/validators/regex';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-form-aplicacion',
  templateUrl: './form-aplicacion.component.html',
  styleUrls: ['./form-aplicacion.component.scss'],
  animations: [fadeInOutDown()]
})
export class FormAplicacionComponent implements OnInit, OnChanges {

  @Input() opc: string = '';
  @Input() titulo: string = '';
  @Input('evaluaciones') evaluacionesCat: Evaluacion[] = [];
  @Input('grupos') gruposCat: Grupo[] = [];
  @Input() aplicacion: Aplicacion;
  @Input('temas') temasCatalogo: Tema[] = [];
  @Input() evaluacion: Evaluacion;
  @Input() tema: Tema;
  @Output() cerrar: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() accion: EventEmitter<boolean> = new EventEmitter<boolean>();

  //STATIC
  MJS_ERROR_REGEX_ALPHANUMERICO_CON_ESPACIOS_Y_PUNTUACION = MSJ_ERROR_REGEX_ALPHANUMERICO_CON_ESPACIOS_Y_PUNTUACION;
  MJS_ERROR_REQUERIDO = MSJ_ERROR_REQUERIDO;

  isMain: Boolean = true;
  fgAplicacion: FormGroup;

  constructor(private fb: FormBuilder, private _toastr: ToastrService, private _aplicaciones: AplicacionService) {
  }

  ngOnInit(): void { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.aplicacion && this.aplicacion != null) {
      this.initForm();
      this.setValues();
    }
  }

  /***************************** REST ******************************/
  save(form: FormGroup) {
    //evaluacion.temas = evaluacion.temas.map(tema => { return { id: tema.id } })
    if (form.valid) {
      if( Object.keys(this.fechasAplicacion.value).length ){
        let aplicacion: Aplicacion = form.value;
        aplicacion.grupos = Object.entries(aplicacion.fechasAplicacion).map( ([key, value]:any) => { return key } );
        this._aplicaciones.save(aplicacion).then(caso => {
          this._toastr.success(MSJ_OK_AGREGADO);
          this.accion.emit(true);
        }, err => {
          this._toastr.error(MSJ_ERROR_CONECTAR_SERVIDOR);
        });
      }else{
        this._toastr.error('Debes agregar por lo menos una fecha de aplciacion para un grupo');
      }
    } else {
      this._toastr.error(MSJ_ERROR_VERIFICAR_FORM);
    }
  }

  update(form: FormGroup) {
    if (form.valid) {
      let aplicacion: Aplicacion = form.value;
      aplicacion.id = this.aplicacion.id;
      aplicacion.grupos = Object.entries(aplicacion.fechasAplicacion).map( ([key, value]:any) => { return key } );
      this._aplicaciones.update(aplicacion).then(caso => {
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
    this.fgAplicacion = this.fb.group({
      nombre: ['', [Validators.required, Validators.pattern(REGEX_ALPHANUMERICO_CON_ESPACIOS_Y_PUNTUACION)]],
      fechasAplicacion: [{}, [Validators.required]],
      evaluaciones: [[], [Validators.required]],
      duracion: ['', [Validators.required]],
      aciertos: [0, [Validators.required, Validators.min(0), Validators.pattern(NUMEROS_SIN_ESPACIOS)]]
    })
  }

  async setValues() {
    this.nombre.setValue(this.aplicacion.nombre);
    this.aciertos.setValue(this.aplicacion.aciertos)
    this.duracion.setValue(this.aplicacion.duracion)
    this.evaluaciones.setValue(this.aplicacion.evaluaciones);
    this.fechasAplicacion.setValue(this.aplicacion.fechasAplicacion);
  }
  
  /***************************** GETTERS ******************************/
  get nombre() { return this.fgAplicacion.get('nombre') as FormControl }
  get fechasAplicacion() { return this.fgAplicacion.get('fechasAplicacion') as FormControl }
  get evaluaciones() { return this.fgAplicacion.get('evaluaciones') as FormControl }
  get duracion() { return this.fgAplicacion.get('duracion') as FormControl }
  get aciertos() { return this.fgAplicacion.get('aciertos') as FormControl }
}