import { Component, OnInit } from '@angular/core';
import { BreadcrumbComponent } from "@breadcrumb/breadcrumb.component";
import { BC_ETAPAS, LINKS_ETAPAS } from "@routing/ListLinks";
import { comprobarPermisos, GESTION_ETAPAS } from '@shared/admin-permissions/permissions';
import { Router } from '@angular/router';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-main-etapas',
  templateUrl: './main-etapas.component.html',
  styleUrls: ['./main-etapas.component.scss']
})
export class MainEtapasComponent implements OnInit {

  cards;

  constructor(private _authServices: AuthService, private router: Router) {
    let usuario = this._authServices.getUsuarioC();
    BreadcrumbComponent.update(BC_ETAPAS);
    if(comprobarPermisos(usuario, GESTION_ETAPAS, router)){
      this.cards = LINKS_ETAPAS;
    }
  }

  ngOnInit(): void {
  }
}
