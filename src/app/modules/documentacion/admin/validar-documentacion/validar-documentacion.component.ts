import { Component, OnInit } from '@angular/core';
import { BreadcrumbComponent } from '@shared/breadcrumb/breadcrumb.component';
import { BC_VALIDAR_DOCUMENTACION } from '@shared/routing-list/ListLinks';

@Component({
  selector: 'app-validar-documentacion',
  templateUrl: './validar-documentacion.component.html',
  styleUrls: ['./validar-documentacion.component.scss']
})
export class ValidarDocumentacionComponent implements OnInit {

  constructor() { 
    BreadcrumbComponent.update(BC_VALIDAR_DOCUMENTACION);
  }

  ngOnInit() {
  }

}
