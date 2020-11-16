import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CuentaPagos } from '@models/cuentas-pagos/cuenta-pagos';
import { cardAnimation } from '@shared/utils/animations/router.animations';

@Component({
  selector: 'app-form-cuentas',
  templateUrl: './form-cuentas-pagos.component.html',
  styleUrls: ['./form-cuentas-pagos.component.scss'],
  animations: [ cardAnimation() ]
})
export class FormCuentasPagosComponent implements OnInit {

  @Input() cuentas: CuentaPagos[];

  constructor(private router:Router) { }

  ngOnInit(): void {
    
  }

  // gotoCuenta(id: string){
  //   this.router.navigate(['/app/pagos/gestionar-cuentas/revisar-cuenta/',id]);
  // }

  // crearCuenta() {
  //   const dialogRef = this.dialog.open(ModalGrupos, {
  //     width: '600px',
  //     data: { opc: 'agregar' }
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result != null) {
  //       /*this._ads.updateDocumento(documento.id, result).then(data =>
  //         this.toast.info("El requisito se actualizó exitosamente")
  //       ).catch(error => this.toast.error(error))*/
  //     }
  //   });
  // }


}
