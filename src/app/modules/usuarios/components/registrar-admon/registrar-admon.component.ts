import { Component, OnInit } from '@angular/core';
import { BreadcrumbComponent } from '@shared/breadcrumb/breadcrumb.component';
import { BC_REGISTRAR_ADMON } from '@shared/routing-list/ListLinks';

@Component({
  selector: 'app-registrar-admon',
  templateUrl: './registrar-admon.component.html',
  styleUrls: ['./registrar-admon.component.scss']
})
export class RegistrarAdmonComponent implements OnInit {

  constructor() { 
    BreadcrumbComponent.update(BC_REGISTRAR_ADMON);
  }

  ngOnInit(): void {
  }

}
