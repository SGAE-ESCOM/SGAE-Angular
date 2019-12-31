import { Component, OnInit } from '@angular/core';
import { linksAdmin } from '@routing/ListLinks';
import { BreadcrumbComponent } from '@breadcrumb/breadcrumb.component';
import { BC_HOME } from '@routing/ListLinks';
import { cardAnimation } from '@shared/router.animations';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [ cardAnimation() ]
})

export class DashboardComponent implements OnInit {

  constructor() {
    BreadcrumbComponent.update(BC_HOME);
  }

  cards = linksAdmin.slice(1); 

  ngOnInit() {
  }

  trackById(index, item) {
    return item.id;
  }
  
}
