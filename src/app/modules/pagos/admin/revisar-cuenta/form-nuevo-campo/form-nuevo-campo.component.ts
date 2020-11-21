import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-form-nuevo-campo',
  templateUrl: './form-nuevo-campo.component.html',
  styleUrls: ['./form-nuevo-campo.component.scss']
})
export class FormNuevoCampoComponent implements OnInit {

  @Output() cerrar: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() accion: EventEmitter<boolean> = new EventEmitter<boolean>();

  fgCampo: FormGroup;
  isForm: Subject<Boolean> = new Subject<Boolean>();

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
    this.isForm.next(true);
  }

  save(form: FormGroup) {
    // if (form.valid) {
    //   this._cuentas.save(form.value).then(caso => {
    //     this._toastr.success("Agregado correctamente");
    //     this.accion.emit(true);
    //   }, err => {
    //     this._toastr.error("Ha ocurrido un error");
    //   });
    // } else {
    //   this._toastr.error("Llena todos los campos requeridos");
    // }
  }

  cerrarModal() {
    this.cerrar.emit(true);
  }

  initForm(): Promise<Boolean> {
    this.fgCampo = this.fb.group({
      nombre: ['', []],
      banco: ['', []],
      noCuenta: ['', []]
    });
    return new Promise<Boolean>(resolve => { return true });
  }

}
