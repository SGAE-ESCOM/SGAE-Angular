import { Component, OnInit } from '@angular/core';
import { BreadcrumbComponent } from "@breadcrumb/breadcrumb.component";
import { BC_EVALUACION, LINKS_EVALUACION } from "@routing/ListLinks";
import { comprobarPermisos, GESTION_EVAL } from '@shared/admin-permissions/permissions';
import { AuthService } from '@services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-evaluacion',
  templateUrl: './main-evaluacion.component.html',
  styleUrls: ['./main-evaluacion.component.scss']
})
export class MainEvaluacionComponent implements OnInit {

  cards;

  constructor(private _authServices: AuthService, private router: Router) {
    let usuario = this._authServices.getUsuarioC();
    BreadcrumbComponent.update(BC_EVALUACION);
    comprobarPermisos(usuario, GESTION_EVAL, router);
    this.cards = LINKS_EVALUACION;
  }

  ngOnInit() {
  }

}