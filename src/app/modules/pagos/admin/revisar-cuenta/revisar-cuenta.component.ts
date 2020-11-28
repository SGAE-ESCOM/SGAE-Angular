import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { BreadcrumbComponent } from '@components/breadcrumb/breadcrumb.component';
import { CuentaPagos } from '@models/cuentas-pagos/cuenta-pagos';
import { GruposPagos } from '@models/cuentas-pagos/grupos-pagos';
import { Grupo } from '@models/evaluacion/Grupo';
import { GruposService } from '@services/evaluacion/grupos.service';
import { CuentasPagosService } from '@services/pagos/cuentas-pagos.service';
import { SweetalertService } from '@services/sweetalert/sweetalert.service';
import { BC_REVISAR_CUENTA } from '@shared/routing-list/ListLinks';
import { ALPHANUMERICO_CON_ESPACIOS, NUMEROS_SIN_ESPACIOS } from '@shared/utils/validators/regex';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-revisar-cuenta',
  templateUrl: './revisar-cuenta.component.html',
  styleUrls: ['./revisar-cuenta.component.scss']
})
export class RevisarCuentaComponent implements OnInit {

  btnActualizarPagos: boolean = true;
  grupos: GruposPagos[] = [];
  cuenta: CuentaPagos;
  idCuenta: string;
  datosAds: {}[] = [];
  fgDatosCuenta: FormGroup;

  editarCuenta: boolean = false;

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private _cuentas: CuentasPagosService, private _grupos: GruposService, 
      private _swal: SweetalertService, public dialog: MatDialog, private _toast: ToastrService, private router: Router) {
    
    /***************** REVISAR PERMISOS *******************/
    this.idCuenta = this.route.snapshot.paramMap.get("id");
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

    this.recargarCuenta();
  }

  recargarCuenta(){
    this._cuentas.getCuenta(this.idCuenta).then((cuenta) => {
      this.cuenta = cuenta.data();
      this.cuenta.id = this.idCuenta;
      this.llenarDatosCuenta();
      
      //Datos Adicionales
      this.datosAds = this.cuenta.datosAds;

      //Informacion Grupos Asociados
      this.grupos.forEach(grupo => {
        grupo.isAsociado = false;
      });

      if(this.cuenta.gruposIds.length != 0){
        this.cuenta.gruposIds.forEach(id => {
          this.grupos.find(grupo => {
            if(grupo.id == id)
              return grupo;
          }).isAsociado = true;
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
    let gruposAsociados: string[] = [];
    this.grupos.forEach(grupo => {
      if(grupo.isAsociado) gruposAsociados.push(grupo.id);
    });

    this.cuenta.gruposIds = gruposAsociados;
    
    this._cuentas.updateDatosCuenta(this.cuenta).then(() => {
      this._swal.informacionActualizada();
    }).catch( err => {
      this._swal.errorActualizar();
      this.llenarDatosCuenta();
    });
    this.btnActualizarPagos = true;
  }

  agregarDatoAdicional(){
    const dialogRef = this.dialog.open(ModalNuevoCampo, {
      width: '600px',
      data: { cuenta: this.cuenta, opc: "agregar", titulo:"Nuevo Campo" }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.recargarCuenta();
      }
    });
  }

  editarCampo(id: string){
    const dialogRef = this.dialog.open(ModalNuevoCampo, {
      width: '600px',
      data: { cuenta: this.cuenta, opc: "actualizar", titulo:"Editar Campo", idCampo: id }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.recargarCuenta();
      }
    });
  }

  eliminarCampo(campo: any){
    this._swal.confirmarEliminar(`¿Deseas eliminar el campo '${campo.nombreCampo}'?`, 'No se podrá revertir esta acción.')
    .then((result) => {
      if (result.value) {
        let index = this.cuenta.datosAds.indexOf(campo,0);
        if (index > -1) {
          this.cuenta.datosAds.splice(index, 1);
        }
        this._cuentas.updateDatosCuenta(this.cuenta).then(() => {
          this._swal.informacionActualizada();
          this.recargarCuenta();
        }).catch( err => {
          this._swal.errorActualizar();
          this.llenarDatosCuenta();
        });
      }
    });
  }

  eliminarCuenta(id: string){
    this._swal.confirmarEliminar(`¿Estas seguro de eliminar esta cuenta para pagos'?`, 'No se podrá revertir esta acción.')
    .then((result) => {
      if (result.value) {
        this._cuentas.delete(id).then(() => {
          this._swal.eliminarCuenta();
          this.router.navigate(['/app/pagos/gestionar-cuentas'])
        }).catch(err => this._toast.error(err));
      }
    });
  }

  getNombreCuentaErrorMessage(){
    return this.fgDatosCuenta.get('nombre').hasError('required') ? 'Este campo es requerido' :
      this.fgDatosCuenta.get('nombre').hasError('pattern') ? 'Nombre no valido' :
        '';
  }

  getBancoErrorMessage(){
    return this.fgDatosCuenta.get('banco').hasError('required') ? 'Este campo es requerido' :
      this.fgDatosCuenta.get('banco').hasError('pattern') ? 'Nombre no valido' :
        '';
  }

  getNoCuentaErrorMessage(){
    return this.fgDatosCuenta.get('noCuenta').hasError('required') ? 'Este campo es requerido' :
      this.fgDatosCuenta.get('noCuenta').hasError('pattern') ? 'Número no valido' :
        '';
  }

  trackById(index, item) {
    return item.id;
  }
}


/******************************* MODALS ***********************************/
@Component({
  selector: 'modal-nuevo-campo',
  templateUrl: './modal-nuevo-campo.component.html',
})
export class ModalNuevoCampo {

  constructor(
    public dialogRef: MatDialogRef<ModalNuevoCampo>,
    private _toast: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  accion(realizado: boolean) {
    this.dialogRef.close(realizado);
  }

  enviarForm(respuesta) {
    /*if (requisito.valid)
      this.dialogRef.close(requisito.value);
    else {
      this._toast.error("Llena todos los campos requeridos");
    }*/
  }

}