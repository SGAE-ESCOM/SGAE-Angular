import { Component, OnInit, Input } from '@angular/core';
import { cardAnimation } from '@shared/animations/router.animations';
import { NavigationLink } from '@models/template/NavigationLink';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
  animations: [cardAnimation()]
})
export class CardsComponent implements OnInit {

  @Input() cards: NavigationLink[];
  
  constructor() { }

  ngOnInit() {
  }

  trackById(index, item) {
    return item.id;
  }

}
