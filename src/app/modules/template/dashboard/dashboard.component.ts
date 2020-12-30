import { Component, OnInit } from '@angular/core';
import { getCardsByEtapas, LINKS_HOME } from '@routing/ListLinks';
import { BreadcrumbComponent } from '@breadcrumb/breadcrumb.component';
import { BC_HOME } from '@routing/ListLinks';
import { cardAnimation } from '@shared/utils/animations/router.animations';
import { AuthService } from '@services/auth.service';

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
    this.cards = getCardsByEtapas(this._authService.getUsuarioC().rol, this._authService.getEtapas()).slice(1);
  }

  ngOnInit() {
  }

  trackById(index, item) {
    return item.id;
  }
  
}
