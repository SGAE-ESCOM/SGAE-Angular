import { Component, OnInit } from '@angular/core';
import { BreadcrumbComponent } from "@breadcrumb/breadcrumb.component";
import { BC_PAGOS } from "@routing/ListLinks";
import { comprobarPermisos, GESTION_PAGOS } from '@shared/admin-permissions/permissions';
import { AuthService } from '@services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-pagos',
  templateUrl: './main-pagos.component.html',
  styleUrls: ['./main-pagos.component.scss']
})
export class MainPagosComponent implements OnInit {

  constructor(private _authServices: AuthService, private router: Router) { 
    let usuario = this._authServices.getUsuarioC();
    BreadcrumbComponent.update(BC_PAGOS);
    comprobarPermisos(usuario, GESTION_PAGOS, router);
    //Agregar Cards de pagos cuando esten listas
  }

  ngOnInit() {
  }

}
