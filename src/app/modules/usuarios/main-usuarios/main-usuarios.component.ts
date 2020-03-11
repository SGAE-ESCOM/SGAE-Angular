import { Component, OnInit } from '@angular/core';
import { BreadcrumbComponent } from "@breadcrumb/breadcrumb.component";
import { BC_USUARIOS, LINKS_USUARIOS } from "@routing/ListLinks";

@Component({
  selector: 'app-main-usuarios',
  templateUrl: './main-usuarios.component.html',
  styleUrls: ['./main-usuarios.component.scss']
})
export class MainUsuariosComponent implements OnInit {

  cards;

  constructor() { 
    BreadcrumbComponent.update(BC_USUARIOS);
    this.cards = LINKS_USUARIOS;
  }

  ngOnInit(): void {
  }

}
