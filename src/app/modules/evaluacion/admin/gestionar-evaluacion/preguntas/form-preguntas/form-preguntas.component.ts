import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Pregunta } from '@models/evaluacion/evaluacion/pregunta';
import { Tema } from '@models/evaluacion/evaluacion/tema';
import { PreguntasService } from '@services/evaluacion/preguntas.service';
import { TemasService } from '@services/evaluacion/temas.service';
import { SweetalertService } from '@services/sweetalert/sweetalert.service';
import { PREGUNTAS } from '@shared/routing-list/ListLinks';
import { MSJ_ERROR_REGEX_ALPHANUMERICO_CON_ESPACIOS_Y_PUNTUACION, MSJ_ERROR_REQUERIDO, MSJ_ERROR_VERIFICAR_FORM, MSJ_OK_AGREGADO, MSJ_OK_EDITADO } from '@shared/utils/mensajes';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-form-preguntas',
  templateUrl: './form-preguntas.component.html',
  styleUrls: ['./form-preguntas.component.scss']
})
export class FormPreguntasComponent implements OnInit, OnChanges {

  @Input() opc: string = '';
  @Input() titulo: string = '';
  @Input() pregunta: Pregunta;
  @Input() tema: Tema;
  @Output() cerrar: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() accion: EventEmitter<boolean> = new EventEmitter<boolean>();

  //STATIC
  MJS_ERROR_REGEX_ALPHANUMERICO_CON_ESPACIOS_Y_PUNTUACION = MSJ_ERROR_REGEX_ALPHANUMERICO_CON_ESPACIOS_Y_PUNTUACION;
  MSJ_ERROR_REQUERIDO = MSJ_ERROR_REQUERIDO;

  isMain: Boolean = true;
  fgPregunta: FormGroup;


  constructor(private fb: FormBuilder, private _toastr: ToastrService, private _preguntas: PreguntasService, private _temas:TemasService, private _swal:SweetalertService) {
  }

  ngOnInit(): void { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.pregunta && this.pregunta != null) {
      this.initFormPregunta();
      this.setValues();
    }
  }

  /***************************** REST ******************************/
  save(form: FormGroup) {
    let pregunta: Pregunta = form.value;
    pregunta.idTema = this.tema.id;
    if (form.valid) {
      this._preguntas.save(pregunta).then(caso => {
        this._toastr.success(MSJ_OK_AGREGADO);
        this.accion.emit(true);
        this.tema.total++;
        this._temas.update(this.tema).then( res => console.log(res) );
      }, err => {
        this._toastr.error("Ha ocurrido un error");
      });
    } else {
      this._toastr.error(MSJ_ERROR_VERIFICAR_FORM);
    }
  }

  update(form: FormGroup) {
    if (form.valid) {
      let pregunta: Pregunta = form.value;
      pregunta.id = this.pregunta.id;
      pregunta.idTema = this.pregunta.idTema;
      this._preguntas.update(pregunta).then(caso => {
        this._toastr.success(MSJ_OK_EDITADO);
        this.accion.emit(true);
      }, err => {
        this._toastr.error("Ha ocurrido un error");
      });
    } else {
      this._toastr.error(MSJ_ERROR_VERIFICAR_FORM);
    }
  }

  cerrarModal() {
    this._swal.confirmarCancelar('¿Deseas cancelar?', 'Nada será guardado').then(result => {
      if (result.value)
        this.cerrar.emit(true);
    });
  }

  /***************************** UTILS ******************************/
  initFormPregunta() {
    this.fgPregunta = this.fb.group({
      enunciado: ['', [Validators.required]],
      img: ['', []],
      opciones: [[], []],
      respuesta: ['', [Validators.required]]
    })
  }

  setValues() {
    this.enunciado.setValue(this.pregunta.enunciado);
    this.img.setValue(this.pregunta.img);
    this.respuesta.setValue(this.pregunta.respuesta);
    this.opciones.setValue(JSON.parse(JSON.stringify(this.pregunta.opciones)));
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

  gotoInfo(){
    window.open('#/'+PREGUNTAS.url+'/info', "_blank");
  }

  /***************************** GETTERS ******************************/
  get enunciado() { return this.fgPregunta.get('enunciado') as FormControl }
  get img() { return this.fgPregunta.get('img') as FormControl }
  get opciones() { return this.fgPregunta.get('opciones') as FormControl }
  get respuesta() { return this.fgPregunta.get('respuesta') as FormControl }
}