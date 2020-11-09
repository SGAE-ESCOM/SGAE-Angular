import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Pregunta } from '@models/evaluacion/evaluacion/pregunta';
import { Tema } from '@models/evaluacion/evaluacion/tema';
import { PreguntasService } from '@services/evaluacion/preguntas.service';
import { MJS_ERROR_REGEX_ALPHANUMERICO_CON_ESPACIOS_Y_PUNTUACION, MJS_ERROR_VERIFICAR_FORM } from '@shared/utils/mensajes';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-form-preguntas',
  templateUrl: './form-preguntas.component.html',
  styleUrls: ['./form-preguntas.component.scss']
})
export class FormPreguntasComponent implements OnInit, OnChanges {
  
  @Input() opc:string = '';
  @Input() pregunta: Pregunta;
  @Input() tema: Tema;
  @Output() cerrar: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() accion: EventEmitter<boolean> = new EventEmitter<boolean>();
  
  //STATIC
  MJS_ERROR_REGEX_ALPHANUMERICO_CON_ESPACIOS_Y_PUNTUACION = MJS_ERROR_REGEX_ALPHANUMERICO_CON_ESPACIOS_Y_PUNTUACION;
  
  titulo:string = '';
  fgPregunta: FormGroup;
  

  constructor(private fb: FormBuilder, private _toastr: ToastrService, private _preguntas:PreguntasService) {
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.pregunta && this.pregunta != null) {
      this.initFormPregunta();
      this.setValues();
    }
  }

  /***************************** REST ******************************/
  save(form: FormGroup) {
    let pregunta:Pregunta = form.value;
    pregunta.idTema = this.tema.id;
    if (form.valid) {
      this._preguntas.save(pregunta).then(caso => {
        this._toastr.success("Agregado correctamente");
        this.accion.emit(true);
      }, err => {
        this._toastr.error("Ha ocurrido un error");
      });
    } else {
      this._toastr.error(MJS_ERROR_VERIFICAR_FORM);
    }
  }

  update(form: FormGroup) {
    console.log("Hola desde el update")
    if (form.valid) {
      let pregunta:Pregunta = form.value;
      pregunta.id = this.pregunta.id;
      pregunta.idTema = this.pregunta.idTema;
      this._preguntas.update(pregunta).then(caso => {
        this._toastr.success("Actualizado correctamente");
        this.accion.emit(true);
      }, err => {
        this._toastr.error("Ha ocurrido un error");
      });
    } else {
      this._toastr.error(MJS_ERROR_VERIFICAR_FORM);
    }
  }

  cerrarModal() {
    this.cerrar.emit(true);
  }

  /***************************** UTILS ******************************/
  initFormPregunta() {
    this.fgPregunta = this.fb.group({
      enunciado: ['', [Validators.required ]],
      img: ['', []],
      opciones: [[], []],
      respuesta: ['', [Validators.required ]]
    })
  }

  setValues(){
    this.enunciado.setValue(this.pregunta.enunciado);
    this.img.setValue(this.pregunta.img);
    this.respuesta.setValue(this.pregunta.respuesta);
    this.opciones.setValue( JSON.parse(  JSON.stringify( this.pregunta.opciones)) );
  }

  /* Eventos */
  handleUpload(event: any, documento) {
    console.log("Hola desde handle")
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.fgPregunta.get(documento).patchValue(reader.result);
      };
    }
  }

  
  /***************************** GETTERS ******************************/
  get enunciado() { return this.fgPregunta.get('enunciado') as FormControl }
  get img() { return this.fgPregunta.get('img') as FormControl }
  get opciones() { return this.fgPregunta.get('opciones') as FormControl }
  get respuesta() { return this.fgPregunta.get('respuesta') as FormControl }
}