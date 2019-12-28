import { Component, OnInit } from '@angular/core';
import { BreadcrumbComponent } from "@breadcrumb/breadcrumb.component";
import { BC_PAGOS } from "@breadcrumb/ListLinks";

@Component({
  selector: 'app-main-pagos',
  templateUrl: './main-pagos.component.html',
  styleUrls: ['./main-pagos.component.scss']
})
export class MainPagosComponent implements OnInit {

  constructor() { 
    BreadcrumbComponent.update(BC_PAGOS);
  }

  ngOnInit() {
  }

}
