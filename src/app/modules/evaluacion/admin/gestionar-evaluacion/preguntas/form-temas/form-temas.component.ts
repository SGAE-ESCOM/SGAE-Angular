import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Tema } from '@models/evaluacion/evaluacion/tema';
import { TemasService } from '@services/evaluacion/temas.service';
import { MJS_ERROR_REGEX_ALPHANUMERICO_CON_ESPACIOS_Y_PUNTUACION } from '@shared/utils/mensajes';
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
  @Output() cerrar: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() accion: EventEmitter<boolean> = new EventEmitter<boolean>();
  
  //STATIC
  MJS_ERROR_REGEX_ALPHANUMERICO_CON_ESPACIOS_Y_PUNTUACION = MJS_ERROR_REGEX_ALPHANUMERICO_CON_ESPACIOS_Y_PUNTUACION;
  
  titulo:string = '';
  fgTema: FormGroup;
  

  constructor(private fb: FormBuilder, private _toastr: ToastrService, private _temas:TemasService) {
    this.initFormTema(new Tema(''));
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.tema && this.tema != null) {
      this.initFormTema(this.tema);
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
      tema.id = this.tema.id;
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
  initFormTema(tema: Tema) {
    this.titulo = tema.tema === '' ? 'Nuevo tema': tema.tema;
    this.fgTema = this.fb.group({
      tema: [tema.tema, [Validators.required, Validators.pattern(REGEX_ALPHANUMERICO_CON_ESPACIOS_Y_PUNTUACION)]],
      subtemas: [tema.subtemas, []]
    })
  }

}
