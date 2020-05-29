import { Component, OnInit } from '@angular/core';
import { BreadcrumbComponent } from "@breadcrumb/breadcrumb.component";
import { BC_CONVOCATORIA } from "@routing/ListLinks";
import { comprobarPermisos, GESTION_CONV } from '@shared/admin-permissions/permissions';
import { AuthService } from '@services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-convocatoria',
  templateUrl: './main-convocatoria.component.html',
  styleUrls: ['./main-convocatoria.component.scss']
})
export class MainConvocatoriaComponent implements OnInit {

  constructor(private _authServices: AuthService, private router: Router) {
    let usuario = this._authServices.getUsuarioC();
    BreadcrumbComponent.update(BC_CONVOCATORIA);
    comprobarPermisos(usuario, GESTION_CONV, router);
  }

  ngOnInit() {
  }

}
