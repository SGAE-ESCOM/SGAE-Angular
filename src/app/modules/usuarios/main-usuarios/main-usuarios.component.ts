import { Component, OnInit } from '@angular/core';
import { BreadcrumbComponent } from "@breadcrumb/breadcrumb.component";
import { BC_USUARIOS, LINKS_USUARIOS } from "@routing/ListLinks";
import { AccesosAdministrador } from '@shared/admin-permissions/permissions';


@Component({
  selector: 'app-main-usuarios',
  templateUrl: './main-usuarios.component.html',
  styleUrls: ['./main-usuarios.component.scss']
})
export class MainUsuariosComponent implements OnInit {

  cards;

  constructor(private accesosAdministrador: AccesosAdministrador) { 
    BreadcrumbComponent.update(BC_USUARIOS);
    if(this.accesosAdministrador.accesoUsuarios()){
      this.cards = LINKS_USUARIOS;
    }
  }

  ngOnInit(): void {
  }

}
