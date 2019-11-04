import { Component, OnInit } from '@angular/core';
import { links } from '../sidenav/sidenav-links';
import { BreadcrumbComponent } from '@app/components/shared/breadcrumb/breadcrumb.component';
import { ListLinks } from '@app/components/shared/breadcrumb/ListLinks';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {

  constructor() {
    BreadcrumbComponent.update( ListLinks.HOME , null);
  }

  cards = links; 

  ngOnInit() {
  }

}
