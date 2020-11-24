import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  @Input() opc: string;
  @Input() titulo: string;
  @Input() idCampo: string;
  @Output() cerrar: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() accion: EventEmitter<boolean> = new EventEmitter<boolean>();

  fgCampo: FormGroup;
  isForm: Subject<Boolean> = new Subject<Boolean>();

  constructor(private fb: FormBuilder, private _cuentas: CuentasPagosService, private _toastr: ToastrService) { }

  ngOnInit(): void {
    this.initForm();
    this.isForm.next(true);
  }

  initForm(): Promise<Boolean> {
    this.fgCampo = this.fb.group({
      nombreCampo: ['', [Validators.required]],
      contenidoCampo: ['', [Validators.required]]
    });

    if(this.opc == "actualizar"){
      let item = this.cuenta.datosAds.find(value => {
        if(value["id"] == this.idCampo)
          return value;
      });
      this.fgCampo.get("nombreCampo").setValue(item["nombreCampo"]);
      this.fgCampo.get("contenidoCampo").setValue(item["contenido"]);
    }

    return new Promise<Boolean>(resolve => { return true });
  }
  

  save(form: FormGroup) {
    if (form.valid) {

      let item: {} = {  
        id: this.getIdToken(),
        orden: 0,
        nombreCampo: form.get("nombreCampo").value, 
        contenido: form.get("contenidoCampo").value };

      this.cuenta.datosAds.push(item);
      this._cuentas.updateDatosCuenta(this.cuenta).then(caso => {
        this._toastr.success("Agregado correctamente");
        this.accion.emit(true);
      }, err => {
        this._toastr.error("Ha ocurrido un error");
        this.cerrarModal();
      });
    } else {
        this._toastr.error("Llena todos los campos requeridos");
    }
  }

  update(form: FormGroup) {
    if (form.valid) {
      
      this.cuenta.datosAds.forEach(value => {
        if(value["id"] == this.idCampo){
          value["nombreCampo"] = form.get("nombreCampo").value;
          value["contenido"] = form.get("contenidoCampo").value;
        }
      });

      this._cuentas.updateDatosCuenta(this.cuenta).then(caso => {
        this._toastr.success("Actualizado correctamente");
        this.accion.emit(true);
      }, err => {
        this._toastr.error("Ha ocurrido un error");
        this.cerrarModal();
      });
    } else {
        this._toastr.error("Llena todos los campos requeridos");
    }
  }


  getIdToken(){
    return new Date().getTime().toString();
  }

  cerrarModal() {
    this.cerrar.emit(true);
  }



}
