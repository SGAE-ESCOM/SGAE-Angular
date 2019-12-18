import { Component, OnInit } from '@angular/core';
import { trigger, style, transition, animate, keyframes, query, stagger } from '@angular/animations';
import { linksAdmin } from '@components/sidenav/sidenav-links';
import { BreadcrumbComponent } from '@breadcrumb/breadcrumb.component';
import { BC_HOME } from '@breadcrumb/ListLinks';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [
    // Trigger animation cards array
    trigger('cardAnimation', [
      // Transition from any state to any state
      transition('* => *', [
        // Initially the all cards are not visible
        query(':enter', style({ opacity: 0 }), { optional: true }),

        // Each card will appear sequentially with the delay of 300ms
        query(':enter', stagger('75ms', [
            animate('350ms ease-in', keyframes([
              style({ opacity: 0, transform: 'scale3d(.3, .3, .3)' }),
              style({ opacity: 1, transform: 'scale3d( 1,  1,  1)' }),
            ]))
          ]), { optional: true })
      ]),
    ])
  ]
})

export class DashboardComponent implements OnInit {

  constructor() {
    BreadcrumbComponent.update(BC_HOME);
  }

  cards = linksAdmin; 

  ngOnInit() {
  }

  trackById(index, item) {
    return item.id;
  }
  
}
