import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Grupo } from '@models/evaluacion/Grupo';
import { GruposService } from '@services/evaluacion/grupos.service';
import { MSJ_ERROR_REGEX_ALPHANUMERICO_CON_ESPACIOS_Y_PUNTUACION, MSJ_ERROR_REQUERIDO, MSJ_ERROR_VERIFICAR_FORM, MSJ_OK_AGREGADO, MSJ_OK_EDITADO } from '@shared/utils/mensajes';
import { ALPHANUMERICO_CON_ESPACIOS } from '@shared/utils/validators/regex';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-form-grupos',
  templateUrl: './form-grupos.component.html',
  styleUrls: ['./form-grupos.component.scss']
})
export class FormGruposComponent implements OnInit, OnChanges {

  MJS_ERROR_REGEX_ALPHANUMERICO_CON_ESPACIOS_Y_PUNTUACION = MSJ_ERROR_REGEX_ALPHANUMERICO_CON_ESPACIOS_Y_PUNTUACION;
  MJS_ERROR_REQUERIDO = MSJ_ERROR_REQUERIDO;

  @Input() opc: string;
  @Input() titulo: string;
  @Input() grupo: Grupo;
  @Output() cerrar: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() accion: EventEmitter<boolean> = new EventEmitter<boolean>();

  fgGrupo: FormGroup;
  isForm: Subject<Boolean> = new Subject<Boolean>();

  constructor(private fb: FormBuilder, private _grupos: GruposService, private _toastr: ToastrService) { }

  ngOnInit(): void {
    this.initForm();
    this.isForm.next(true);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.grupo && this.grupo != null) {
      this.isForm.subscribe(result => {
        if (result)
          this.fgGrupo.get('nombre').setValue(this.grupo.nombre);
      });
    }
  }

  initForm(): Promise<Boolean> {
    this.fgGrupo = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(50), Validators.pattern(ALPHANUMERICO_CON_ESPACIOS)]]
    });
    return new Promise<Boolean>(resolve => { return true });
  }

  save(form: FormGroup) {
    if (form.valid) {
      this._grupos.save(form.value).then(caso => {
        this._toastr.success(MSJ_OK_AGREGADO);
        this.accion.emit(true);
      }, err => {
        this._toastr.error("Ha ocurrido un error");
      });
    } else {
      this._toastr.error(MSJ_ERROR_VERIFICAR_FORM);
    }
  }

  update(form: FormGroup) {
    if (form.valid) {
      let grupo: Grupo = form.value;
      grupo.id = this.grupo.id;
      this._grupos.update(grupo).then(caso => {
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
    this.cerrar.emit(true);
  }

  get nombre() { return this.fgGrupo.get('nombre') as FormControl }
}
