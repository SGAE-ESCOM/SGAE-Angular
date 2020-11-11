import { Component, OnInit } from '@angular/core';
import { BreadcrumbComponent } from '@components/breadcrumb/breadcrumb.component';
import { BC_EVIDENCIA_PAGO } from '@shared/routing-list/ListLinks';

@Component({
  selector: 'app-evidencia-pago',
  templateUrl: './evidencia-pago.component.html',
  styleUrls: ['./evidencia-pago.component.scss']
})
export class EvidenciaPagoComponent implements OnInit {

  constructor() { 
    /***************** REVISAR ACCESO SOLO ASPIRANTES *******************/

    BreadcrumbComponent.update(BC_EVIDENCIA_PAGO);
  }

  ngOnInit(): void {
  }

}
