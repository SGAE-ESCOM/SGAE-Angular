import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Pregunta } from '@models/evaluacion/evaluacion/pregunta';
import { Tema } from '@models/evaluacion/evaluacion/tema';
import { TemasService } from '@services/evaluacion/temas.service';
import { MJS_ERROR_REGEX_ALPHANUMERICO_CON_ESPACIOS_Y_PUNTUACION } from '@shared/utils/mensajes';
import { REGEX_ALPHANUMERICO_CON_ESPACIOS_Y_PUNTUACION } from '@shared/utils/validators/regex';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-form-preguntas',
  templateUrl: './form-preguntas.component.html',
  styleUrls: ['./form-preguntas.component.scss']
})
export class FormPreguntasComponent implements OnInit, OnChanges {
  
  @Input() opc:string = '';
  @Input() pregunta: Pregunta;
  @Output() cerrar: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() accion: EventEmitter<boolean> = new EventEmitter<boolean>();
  
  //STATIC
  MJS_ERROR_REGEX_ALPHANUMERICO_CON_ESPACIOS_Y_PUNTUACION = MJS_ERROR_REGEX_ALPHANUMERICO_CON_ESPACIOS_Y_PUNTUACION;
  
  titulo:string = '';
  fgPregunta: FormGroup;
  

  constructor(private fb: FormBuilder, private _toastr: ToastrService, private _temas:TemasService) {
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
    if (form.valid) {
      this._temas.save(form.value).then(caso => {
        this._toastr.success("Agregado correctamente");
        this.accion.emit(true);
      }, err => {
        this._toastr.error("Ha ocurrido un error");
      });
    } else {
      this._toastr.error("Debes agregar un nombre");
    }
  }

  update(form: FormGroup) {
    if (form.valid) {
      let tema:Tema = form.value;
      tema.id = this.pregunta.id;
      this._temas.update(tema).then(caso => {
        this._toastr.success("Actualizado correctamente");
        this.accion.emit(true);
      }, err => {
        this._toastr.error("Ha ocurrido un error");
      });
    } else {
      this._toastr.error("Debes agregar un nombre");
    }
  }

  cerrarModal() {
    this.cerrar.emit(true);
  }

  /***************************** UTILS ******************************/
  initFormPregunta() {
    //this.titulo = tema.tema === '' ? 'Nuevo tema': tema.tema;
    this.fgPregunta = this.fb.group({
      enunciado: ['', [Validators.required, Validators.pattern(REGEX_ALPHANUMERICO_CON_ESPACIOS_Y_PUNTUACION)]],
      img: ['', []],
      opciones: [[], []]
    })
  }

  setValues(){
    this.enunciado.setValue(this.pregunta.enunciado);
    this.img.setValue(this.pregunta.img);
  }

  /* Eventos */
  handleUpload(event: any, documento) {
    console.log("Hola desde handle")
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        /*let jsonFile = {
          nombre: file.name,
          archivo: reader.result
        };*/
        this.fgPregunta.get(documento).patchValue(reader.result);
      };
    }
  }

  
  /***************************** GETTERS ******************************/
  get enunciado() { return this.fgPregunta.get('enunciado') as FormControl }
  get img() { return this.fgPregunta.get('img') as FormControl }
}