import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbComponent } from '@components/breadcrumb/breadcrumb.component';
import { CuentaPagos } from '@models/cuentas-pagos/cuenta-pagos';
import { GruposPagos } from '@models/cuentas-pagos/grupos-pagos';
import { Grupo } from '@models/evaluacion/Grupo';
import { GruposService } from '@services/evaluacion/grupos.service';
import { CuentasPagosService } from '@services/pagos/cuentas-pagos.service';
import { SweetalertService } from '@services/sweetalert/sweetalert.service';
import { BC_REVISAR_CUENTA } from '@shared/routing-list/ListLinks';
import { ALPHANUMERICO_CON_ESPACIOS, NUMEROS_SIN_ESPACIOS } from '@shared/utils/validators/regex';

@Component({
  selector: 'app-revisar-cuenta',
  templateUrl: './revisar-cuenta.component.html',
  styleUrls: ['./revisar-cuenta.component.scss']
})
export class RevisarCuentaComponent implements OnInit {

  grupos: GruposPagos[] = [];
  cuenta: CuentaPagos;
  fgDatosCuenta: FormGroup;

  editarCuenta: boolean = false;

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private _cuentas: CuentasPagosService, private _grupos: GruposService, private _swal: SweetalertService) {

    BreadcrumbComponent.update(BC_REVISAR_CUENTA);
  }

  ngOnInit(): void {
    //Informacion Grupos
    this._grupos.get().subscribe(grupos => { this.grupos = grupos }).remove;

    //Informacion Datos Principales de la cuenta
    this.fgDatosCuenta = this.fb.group({
      nombre: ['', [Validators.required, Validators.pattern(ALPHANUMERICO_CON_ESPACIOS)]],
      banco: ['', [Validators.required, Validators.pattern(ALPHANUMERICO_CON_ESPACIOS)]],
      noCuenta: ['', [Validators.required, Validators.pattern(NUMEROS_SIN_ESPACIOS)]]
    });

    let idCuenta = this.route.snapshot.paramMap.get("id");
    this._cuentas.getCuenta(idCuenta).then((cuenta) => {
      this.cuenta = cuenta.data();
      this.cuenta.id = idCuenta;
      this.llenarDatosCuenta();

      //Informacion Grupos Asociados
      this.grupos.forEach(grupo => {
        grupo.isAsociado = false;
      });
      
      if(this.cuenta.gruposIds.length != 0){
        this.cuenta.gruposIds.forEach(id => {
          this.grupos.find(grupo => {
            grupo.id == id;
          })[0].isAsociado = true;
        });
      }

    }).catch( err =>  {
      console.log(err);
    });

    
  }

  llenarDatosCuenta(){
    this.fgDatosCuenta.get('nombre').setValue(this.cuenta.nombre);
    this.fgDatosCuenta.get('banco').setValue(this.cuenta.banco);
    this.fgDatosCuenta.get('noCuenta').setValue(this.cuenta.noCuenta);
  }

  cancelarEdicionDatosCuenta(){
    this.llenarDatosCuenta();
    this.editarCuenta = false;
  }

  actualizarDatosCuenta(fgDatosCuenta: FormGroup){
    if(fgDatosCuenta.valid){
      let cuentaUpdate: CuentaPagos = this.cuenta;
      cuentaUpdate.nombre = fgDatosCuenta.get("nombre").value;
      cuentaUpdate.banco = fgDatosCuenta.get("banco").value;
      cuentaUpdate.noCuenta = fgDatosCuenta.get("noCuenta").value;

      this._cuentas.updateDatosCuenta(this.cuenta).then(() => {
        this._swal.informacionActualizada();
        this.cuenta.nombre = cuentaUpdate.nombre;
        this.cuenta.banco = cuentaUpdate.banco;
        this.cuenta.noCuenta = cuentaUpdate.noCuenta;
      }).catch( err => {
        this._swal.errorActualizar();
        this.llenarDatosCuenta();
      });
      this.editarCuenta = false;
    }
  }

  actualizarGrupos(){
    console.log(this.grupos);
  }

  trackById(index, item) {
    return item.id;
  }

}
