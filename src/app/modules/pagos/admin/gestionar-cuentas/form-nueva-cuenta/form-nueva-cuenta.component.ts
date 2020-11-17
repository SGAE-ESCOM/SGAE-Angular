import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CuentasPagosService } from '@services/pagos/cuentas-pagos.service';
import { ALPHANUMERICO_CON_ESPACIOS } from '@shared/utils/validators/regex';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-form-nueva-cuenta',
  templateUrl: './form-nueva-cuenta.component.html',
  styleUrls: ['./form-nueva-cuenta.component.scss']
})
export class FormNuevaCuentaComponent implements OnInit {

  @Output() cerrar: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() accion: EventEmitter<boolean> = new EventEmitter<boolean>();

  fgCuenta: FormGroup;
  isForm: Subject<Boolean> = new Subject<Boolean>();
  
  constructor(private fb: FormBuilder, private _cuentas: CuentasPagosService, private _toastr: ToastrService) { }

  ngOnInit(): void {
    this.initForm();
    this.isForm.next(true);
  }

  //Revisar validaciones de los demas datos
  initForm(): Promise<Boolean> {
    this.fgCuenta = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(50), Validators.pattern(ALPHANUMERICO_CON_ESPACIOS)]],
      banco: ['', [Validators.required, Validators.maxLength(50), Validators.pattern(ALPHANUMERICO_CON_ESPACIOS)]],
      noCuenta: ['', [Validators.required, Validators.maxLength(50), Validators.pattern(ALPHANUMERICO_CON_ESPACIOS)]]
    });
    return new Promise<Boolean>(resolve => { return true });
  }

  save(form: FormGroup) {
    if (form.valid) {
      this._cuentas.save(form.value).then(caso => {
        this._toastr.success("Agregado correctamente");
        this.accion.emit(true);
      }, err => {
        this._toastr.error("Ha ocurrido un error");
      });
    } else {
      this._toastr.error("Llena todos los campos requeridos");
    }
  }

  cerrarModal() {
    this.cerrar.emit(true);
  }

}
