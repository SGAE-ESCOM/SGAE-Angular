import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BreadcrumbComponent } from "@breadcrumb/breadcrumb.component";
import { CuentaPagos } from '@models/cuentas-pagos/cuenta-pagos';
import { AuthService } from '@services/auth.service';
import { CuentasPagosService } from '@services/pagos/cuentas-pagos.service';
import { comprobarPermisos, GESTION_PAGOS, sinAcceso } from '@shared/admin-permissions/permissions';
import { BC_GESTIONAR_CUENTAS, BC_PAGOS } from '@shared/routing-list/ListLinks';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-gestionar-cuentas',
  templateUrl: './gestionar-cuentas.component.html',
  styleUrls: ['./gestionar-cuentas.component.scss']
})
export class GestionarCuentasComponent implements OnInit {

  /** Cuentas de prueba **/
  // cuentas = [new CuentaPagos('1','Cuenta Banamex', 'Banamex', '1234 5678 1234 4567', 'ESCOM1234'), 
  //            new CuentaPagos('2','Cuenta Bancomer', 'Bancomer', '1234 5678 1234 4567', 'UPICSSA1234'),
  //            new CuentaPagos('1','Cuenta Banorte', 'Banorte', '1234 5678 1234 4567', 'ESIME1234'),
  //            new CuentaPagos('1','Cuenta Banamex', 'Banamex', '1234 5678 1234 4567', 'ESCOM1234')];

  cuentas: CuentaPagos[] = [];

  constructor(public dialog: MatDialog, private _cuentas: CuentasPagosService, private router: Router, private _authServices: AuthService) { 
    /***************** REVISAR PERMISOS *******************/
    let usuario = this._authServices.getUsuarioC();
    //Comprobar Permisos
    BreadcrumbComponent.update(BC_PAGOS);
    if(usuario.rol != 'root' && !comprobarPermisos(usuario, GESTION_PAGOS, router)) sinAcceso(router);

    BreadcrumbComponent.update(BC_GESTIONAR_CUENTAS);
  }

  ngOnInit(): void {
    this._cuentas.get().subscribe(cuentas => { this.cuentas = cuentas }).remove;
  }

  crearCuenta(){
    const dialogRef = this.dialog.open(ModalNuevaCuenta, {
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == null) {
        //Ocurrio un error y no se pudo registrar
      }
    });
  }

}


/******************************* MODALS ***********************************/
@Component({
  selector: 'modal-nueva-cuenta',
  templateUrl: './modal-nueva-cuenta.component.html',
})
export class ModalNuevaCuenta {

  constructor(
    public dialogRef: MatDialogRef<ModalNuevaCuenta>,
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