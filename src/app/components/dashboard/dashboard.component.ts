import { Component, OnInit } from '@angular/core';
import { links } from '../sidenav/sidenav-links';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  cards = links; 

  ngOnInit() {
  }

}
