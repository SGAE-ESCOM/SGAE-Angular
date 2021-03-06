import { Component, OnInit } from '@angular/core';
import { BreadcrumbComponent } from "@breadcrumb/breadcrumb.component";
import { BC_PAGOS, LINKS_PAGOS } from "@routing/ListLinks";
import { comprobarPermisos, GESTION_PAGOS, sinAcceso } from '@shared/admin-permissions/permissions';
import { AuthService } from '@services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-pagos',
  templateUrl: './main-pagos.component.html',
  styleUrls: ['./main-pagos.component.scss']
})
export class MainPagosComponent implements OnInit {

  cards;

  constructor(private _authServices: AuthService, private router: Router) { 
    let usuario = this._authServices.getUsuarioC();
    //Comprobar Permisos
    BreadcrumbComponent.update(BC_PAGOS);
    if(usuario.rol == 'admin' && !comprobarPermisos(usuario, GESTION_PAGOS, router)) sinAcceso(router);
    BreadcrumbComponent.update(BC_PAGOS);
    this.cards = LINKS_PAGOS[this._authServices.getUsuarioC().rol];
  }

  ngOnInit() {
  }

}
