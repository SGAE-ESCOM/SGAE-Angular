import { Component, OnInit } from '@angular/core';
import { BreadcrumbComponent } from '@shared/breadcrumb/breadcrumb.component';
import { BC_GESTION_ASPIRANTES } from '@shared/routing-list/ListLinks';

@Component({
  selector: 'app-gestion-aspirantes',
  templateUrl: './gestion-aspirantes.component.html',
  styleUrls: ['./gestion-aspirantes.component.scss']
})
export class GestionAspirantesComponent implements OnInit {

  constructor() {
    BreadcrumbComponent.update(BC_GESTION_ASPIRANTES);
  }

  ngOnInit(): void {
  }

}
