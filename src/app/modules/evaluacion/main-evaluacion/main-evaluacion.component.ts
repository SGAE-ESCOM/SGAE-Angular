import { Component, OnInit } from '@angular/core';
import { BreadcrumbComponent } from "@breadcrumb/breadcrumb.component";
import { BC_EVALUACION, LINKS_EVALUACION } from "@routing/ListLinks";
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-main-evaluacion',
  templateUrl: './main-evaluacion.component.html',
  styleUrls: ['./main-evaluacion.component.scss']
})
export class MainEvaluacionComponent implements OnInit {

  usuario;
  cards;

  constructor(private _authServices: AuthService ) {
    BreadcrumbComponent.update(BC_EVALUACION);
    this.usuario = this._authServices.getUsuarioC();
    this.cards = LINKS_EVALUACION[this.usuario.rol];
  }

  ngOnInit() {
  }

}