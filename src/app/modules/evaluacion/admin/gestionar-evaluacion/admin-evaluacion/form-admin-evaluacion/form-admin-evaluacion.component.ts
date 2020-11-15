import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Evaluacion } from '@models/evaluacion/Evaluacion';
import { Tema } from '@models/evaluacion/evaluacion/tema';
import { TemasService } from '@services/evaluacion/temas.service';
import { MJS_ERROR_REGEX_ALPHANUMERICO_CON_ESPACIOS_Y_PUNTUACION, MJS_ERROR_REQUERIDO, MJS_ERROR_VERIFICAR_FORM, MSJ_OK_AGREGADO, MSJ_OK_EDITADO } from '@shared/utils/mensajes';
import { REGEX_ALPHANUMERICO_CON_ESPACIOS_Y_PUNTUACION } from '@shared/utils/validators/regex';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-form-admin-evaluacion',
  templateUrl: './form-admin-evaluacion.component.html',
  styleUrls: ['./form-admin-evaluacion.component.scss']
})
export class FormAdminEvaluacionComponent implements OnInit, OnChanges {

  @Input() opc: string = '';
  @Input() titulo: string = '';
  @Input() evaluacion: Evaluacion;
  @Input() tema: Tema;
  @Output() cerrar: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() accion: EventEmitter<boolean> = new EventEmitter<boolean>();

  //STATIC
  MJS_ERROR_REGEX_ALPHANUMERICO_CON_ESPACIOS_Y_PUNTUACION = MJS_ERROR_REGEX_ALPHANUMERICO_CON_ESPACIOS_Y_PUNTUACION;
  MJS_ERROR_REQUERIDO = MJS_ERROR_REQUERIDO;

  isMain: Boolean = true;
  fgPregunta: FormGroup;
  temasCatalogo: Tema[];

  constructor(private fb: FormBuilder, private _toastr: ToastrService, private _temas:TemasService) {
  }

  ngOnInit(): void { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.evaluacion && this.evaluacion != null) {
      this.initFormPregunta();
      this.getCatalogoTemas();
      this.setValues();
    }
  }

  /***************************** REST ******************************/
  save(form: FormGroup) {
    /* let evaluacion: Evaluacion = form.value;
    evaluacion.idTema = this.tema.id;
    if (form.valid) {
      this._preguntas.save(evaluacion).then(caso => {
        this._toastr.success(MSJ_OK_AGREGADO);
        this.accion.emit(true);
      }, err => {
        this._toastr.error("Ha ocurrido un error");
      });
    } else {
      this._toastr.error(MJS_ERROR_VERIFICAR_FORM);
    } */
  }

  update(form: FormGroup) {
    /* if (form.valid) {
      let evaluacion: Evaluacion = form.value;
      evaluacion.id = this.evaluacion.id;
      evaluacion.idTema = this.evaluacion.idTema;
      this._preguntas.update(evaluacion).then(caso => {
        this._toastr.success(MSJ_OK_EDITADO);
        this.accion.emit(true);
      }, err => {
        this._toastr.error("Ha ocurrido un error");
      });
    } else {
      this._toastr.error(MJS_ERROR_VERIFICAR_FORM);
    } */
  }

  cerrarModal() {
    this.cerrar.emit(true);
  }

  /***************************** UTILS ******************************/
  async initFormPregunta() {
    this.fgPregunta = this.fb.group({
      nombre: ['', [Validators.required, Validators.pattern( REGEX_ALPHANUMERICO_CON_ESPACIOS_Y_PUNTUACION)]],
      temas: [[], [Validators.required]]
    })
  }

  async getCatalogoTemas(){
    this._temas.get().subscribe( temas => {this.temasCatalogo = temas, console.log(this.temasCatalogo) } );
    
  }

  setValues() {
    /* this.enunciado.setValue(this.evaluacion.enunciado);
    this.img.setValue(this.evaluacion.img);
    this.respuesta.setValue(this.evaluacion.respuesta);
    this.opciones.setValue(JSON.parse(JSON.stringify(this.evaluacion.opciones))); */
  }

  /* Eventos */
  handleUpload(event: any, documento) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.fgPregunta.get(documento).patchValue(reader.result);
      };
    }
  }

  isMainActivated(isActived: Boolean){
    this.isMain = isActived;
  }

  /***************************** GETTERS ******************************/
  get nombre() { return this.fgPregunta.get('nombre') as FormControl }
  get temas() { return this.fgPregunta.get('temas') as FormControl }

}
