import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Aplicacion } from '@models/evaluacion/aplicacion';
import { Evaluacion } from '@models/evaluacion/evaluacion';
import { Tema } from '@models/evaluacion/evaluacion/tema';
import { Grupo } from '@models/evaluacion/Grupo';
import { AdminEvaluacionesService } from '@services/evaluacion/admin-evaluaciones.service';
import { fadeInOutDown } from '@shared/utils/animations/router.animations';
import { MSJ_ERROR_CONECTAR_SERVIDOR, MSJ_ERROR_REGEX_ALPHANUMERICO_CON_ESPACIOS_Y_PUNTUACION, MSJ_ERROR_REQUERIDO, MSJ_ERROR_VERIFICAR_FORM, MSJ_OK_AGREGADO, MSJ_OK_EDITADO } from '@shared/utils/mensajes';
import { REGEX_ALPHANUMERICO_CON_ESPACIOS_Y_PUNTUACION } from '@shared/utils/validators/regex';
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
  @Input() evaluaciones: Evaluacion[] = [];
  @Input() grupos: Grupo[] = [];
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

  constructor(private fb: FormBuilder, private _toastr: ToastrService, private _evaluaciones: AdminEvaluacionesService) {
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
    let evaluacion: Evaluacion = form.value;
    //evaluacion.temas = evaluacion.temas.map(tema => { return { id: tema.id } })
    if (form.valid) {
      this._evaluaciones.save(evaluacion).then(caso => {
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
      let evaluacion: Evaluacion = form.value;
      evaluacion.id = this.evaluacion.id;
      //evaluacion.temas = evaluacion.temas.map(tema => { return { id: tema.id } })
      this._evaluaciones.update(evaluacion).then(caso => {
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
      grupo: ['', [Validators.required]],
      temas: [[], [Validators.required]]
    })
  }

  async setValues() {
    this.nombre.setValue(this.aplicacion.nombre)
    //this.temas.setValue(this.aplicacion.temas);
  }

  /* Eventos */
  handleUpload(event: any, documento) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.fgAplicacion.get(documento).patchValue(reader.result);
      };
    }
  }

  isMainActivated(isActived: Boolean) {
    this.isMain = isActived;
  }

  /***************************** GETTERS ******************************/
  get nombre() { return this.fgAplicacion.get('nombre') as FormControl }
  get grupo() { return this.fgAplicacion.get('grupo') as FormControl }
  get temas() { return this.fgAplicacion.get('temas') as FormControl }

}