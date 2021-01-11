import { Component, OnInit } from '@angular/core';
import { getCardsByEtapas, LINKS_HOME } from '@routing/ListLinks';
import { BreadcrumbComponent } from '@breadcrumb/breadcrumb.component';
import { BC_HOME } from '@routing/ListLinks';
import { cardAnimation } from '@shared/utils/animations/router.animations';
import { AuthService } from '@services/auth.service';
import { filtrarLinksPorPermisos } from '@shared/admin-permissions/permissions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [ cardAnimation() ]
})

export class DashboardComponent implements OnInit {

  cards = [];

  constructor(private _authService: AuthService) {
    BreadcrumbComponent.update(BC_HOME);
    let usuario = this._authService.getUsuarioC();
    let cardsAux = getCardsByEtapas(usuario.rol, this._authService.getEtapas()).slice(1);
    if(usuario.rol == 'admin') this.cards = filtrarLinksPorPermisos(cardsAux, usuario.permisos);
    else if(usuario.rol == 'root') this.cards = getCardsByEtapas(this._authService.getUsuarioC().rol, this._authService.getEtapas()).slice(1);
    else if(usuario.rol == 'aspirante'){
      let resultadosActive = false;
      if ((typeof usuario.estado !== 'undefined') && (typeof usuario.estado.publicacionResultados !== 'undefined'))
        resultadosActive = usuario.estado.publicacionResultados == 'validada';
      this.cards = getCardsByEtapas(this._authService.getUsuarioC().rol, this._authService.getEtapas(), resultadosActive).slice(1);
    } 
  }

  ngOnInit() {
  }

  trackById(index, item) {
    return item.id;
  }
  
}
