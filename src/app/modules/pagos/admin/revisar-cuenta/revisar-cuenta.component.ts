import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbComponent } from '@components/breadcrumb/breadcrumb.component';
import { CuentaPagos } from '@models/cuentas-pagos/cuenta-pagos';
import { BC_REVISAR_CUENTA } from '@shared/routing-list/ListLinks';

@Component({
  selector: 'app-revisar-cuenta',
  templateUrl: './revisar-cuenta.component.html',
  styleUrls: ['./revisar-cuenta.component.scss']
})
export class RevisarCuentaComponent implements OnInit {

  cuenta;

  constructor(private route: ActivatedRoute) {

    BreadcrumbComponent.update(BC_REVISAR_CUENTA);

    this.cuenta = { id: this.route.snapshot.paramMap.get("id") };
    console.log(this.cuenta);
  }

  ngOnInit(): void {
  }

}
