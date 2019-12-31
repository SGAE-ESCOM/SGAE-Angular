import { Component, OnInit } from '@angular/core';
import { BreadcrumbComponent } from "@breadcrumb/breadcrumb.component";
import { BC_DOCUMENTACION, linksDocumentacionAdmin } from "@routing/ListLinks";
import { fallIn } from '@shared/router.animations';

@Component({
  selector: 'app-main-documentacion',
  templateUrl: './main-documentacion.component.html',
  styleUrls: ['./main-documentacion.component.scss'],
  animations: [ fallIn() ]
})
export class MainDocumentacionComponent implements OnInit {

  cards = linksDocumentacionAdmin;

  constructor() {
    BreadcrumbComponent.update(BC_DOCUMENTACION);
  }

  ngOnInit() {
  }

}
