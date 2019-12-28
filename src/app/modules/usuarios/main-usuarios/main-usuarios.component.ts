import { Component, OnInit } from '@angular/core';
import { BreadcrumbComponent } from "@breadcrumb/breadcrumb.component";
import { BC_USUARIOS } from "@breadcrumb/ListLinks";

@Component({
  selector: 'app-main-usuarios',
  templateUrl: './main-usuarios.component.html',
  styleUrls: ['./main-usuarios.component.scss']
})
export class MainUsuariosComponent implements OnInit {

  constructor() { 
    BreadcrumbComponent.update(BC_USUARIOS);
  }

  ngOnInit() {
  }

}
