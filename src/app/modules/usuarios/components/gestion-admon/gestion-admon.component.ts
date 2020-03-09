import { Component, OnInit } from '@angular/core';
import { BreadcrumbComponent } from '@shared/breadcrumb/breadcrumb.component';
import { BC_GESTION_ADMON } from '@shared/routing-list/ListLinks';

@Component({
  selector: 'app-gestion-admon',
  templateUrl: './gestion-admon.component.html',
  styleUrls: ['./gestion-admon.component.scss']
})
export class GestionAdmonComponent implements OnInit {

  constructor() {
    BreadcrumbComponent.update(BC_GESTION_ADMON);
  }

  ngOnInit(): void {
  }

}
