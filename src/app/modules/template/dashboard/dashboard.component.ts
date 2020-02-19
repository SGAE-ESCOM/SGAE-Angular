import { Component, OnInit } from '@angular/core';
import { LINKS_HOME } from '@routing/ListLinks';
import { BreadcrumbComponent } from '@breadcrumb/breadcrumb.component';
import { BC_HOME } from '@routing/ListLinks';
import { cardAnimation } from '@shared/animations/router.animations';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [ cardAnimation() ]
})

export class DashboardComponent implements OnInit {

  cards = LINKS_HOME['admin'].slice(1);

  constructor(private _authService: AuthService) {
    BreadcrumbComponent.update(BC_HOME);
    this.cards = LINKS_HOME[this._authService.getUsuarioC().rol].slice(1);
  }

  ngOnInit() {
  }

  trackById(index, item) {
    return item.id;
  }
  
}
