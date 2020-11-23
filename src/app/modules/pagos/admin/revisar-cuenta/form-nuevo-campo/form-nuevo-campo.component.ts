import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CuentaPagos } from '@models/cuentas-pagos/cuenta-pagos';
import { CuentasPagosService } from '@services/pagos/cuentas-pagos.service';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-form-nuevo-campo',
  templateUrl: './form-nuevo-campo.component.html',
  styleUrls: ['./form-nuevo-campo.component.scss']
})
export class FormNuevoCampoComponent implements OnInit {

  @Input() cuenta: CuentaPagos;
  @Output() cerrar: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() accion: EventEmitter<boolean> = new EventEmitter<boolean>();

  fgCampo: FormGroup;
  isForm: Subject<Boolean> = new Subject<Boolean>();

  constructor(private fb: FormBuilder, private _cuentas: CuentasPagosService, private _toastr: ToastrService) { }

  ngOnInit(): void {
    this.initForm();
    this.isForm.next(true);
  }

  save(form: FormGroup) {
    if (form.valid) {

      let item: {} = { nombreCampo: form.get("nombreCampo").value,
                       contenido: form.get("contenidoCampo").value};
      this.cuenta.datosAds.push(item);
      this._cuentas.updateDatosCuenta(this.cuenta).then(caso => {
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

  initForm(): Promise<Boolean> {
    this.fgCampo = this.fb.group({
      nombreCampo: ['', []],
      contenidoCampo: ['', []]
    });
    return new Promise<Boolean>(resolve => { return true });
  }

}
