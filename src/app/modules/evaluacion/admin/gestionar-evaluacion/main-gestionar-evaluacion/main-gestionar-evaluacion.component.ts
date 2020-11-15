import { Component, OnInit } from '@angular/core';
import { BreadcrumbComponent } from '@components/breadcrumb/breadcrumb.component';
import { AuthService } from '@services/auth.service';
import { BC_GESTIONAR_EVALUACION, LINKS_GESTIONAR_EVALUACIONES } from '@shared/routing-list/ListLinks';

@Component({
  selector: 'app-main-gestionar-evaluacion',
  templateUrl: './main-gestionar-evaluacion.component.html',
  styleUrls: ['./main-gestionar-evaluacion.component.scss']
})
export class MainGestionarEvaluacionComponent implements OnInit {

  cards: any[];

  constructor(private _auth:AuthService) {
    BreadcrumbComponent.update(BC_GESTIONAR_EVALUACION);
    this.cards = LINKS_GESTIONAR_EVALUACIONES[_auth.getUsuarioC().rol];
  }

  ngOnInit(): void {
  }

}
