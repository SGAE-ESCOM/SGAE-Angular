import { Component, OnInit } from '@angular/core';
import { BreadcrumbComponent } from "@breadcrumb/breadcrumb.component";
import { BC_EVALUACION } from "@routing/ListLinks";

@Component({
  selector: 'app-main-evaluacion',
  templateUrl: './main-evaluacion.component.html',
  styleUrls: ['./main-evaluacion.component.scss']
})
export class MainEvaluacionComponent implements OnInit {

  constructor() {
    BreadcrumbComponent.update(BC_EVALUACION);
  }

  ngOnInit() {
  }

}
