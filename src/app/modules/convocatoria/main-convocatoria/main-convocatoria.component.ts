import { Component, OnInit } from '@angular/core';
import { BreadcrumbComponent } from "@breadcrumb/breadcrumb.component";
import { BC_CONVOCATORIA } from "@routing/ListLinks";

@Component({
  selector: 'app-main-convocatoria',
  templateUrl: './main-convocatoria.component.html',
  styleUrls: ['./main-convocatoria.component.scss']
})
export class MainConvocatoriaComponent implements OnInit {

  constructor() {
    BreadcrumbComponent.update(BC_CONVOCATORIA);
  }

  ngOnInit() {
  }

}
