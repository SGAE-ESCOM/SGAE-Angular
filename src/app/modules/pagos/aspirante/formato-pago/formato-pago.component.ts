import { Component, OnInit } from '@angular/core';
import { BreadcrumbComponent } from '@components/breadcrumb/breadcrumb.component';
import { BC_FORMATO_PAGO } from '@shared/routing-list/ListLinks';

@Component({
  selector: 'app-formato-pago',
  templateUrl: './formato-pago.component.html',
  styleUrls: ['./formato-pago.component.scss']
})
export class FormatoPagoComponent implements OnInit {

  constructor() {
    /***************** REVISAR ACCESO SOLO ASPIRANTES *******************/

    BreadcrumbComponent.update(BC_FORMATO_PAGO);
   }

  ngOnInit(): void {
  }

}
