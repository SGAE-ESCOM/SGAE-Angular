import { Component, OnInit } from '@angular/core';
import { BreadcrumbComponent } from "@breadcrumb/breadcrumb.component";
import { BC_ETAPAS, LINKS_ETAPAS } from "@routing/ListLinks";

@Component({
  selector: 'app-main-etapas',
  templateUrl: './main-etapas.component.html',
  styleUrls: ['./main-etapas.component.scss']
})
export class MainEtapasComponent implements OnInit {

  cards;

  constructor() {
    BreadcrumbComponent.update(BC_ETAPAS);
    this.cards = LINKS_ETAPAS;
  }

  ngOnInit(): void {
  }
}
