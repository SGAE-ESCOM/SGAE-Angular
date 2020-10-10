import { Component, OnInit, Input } from '@angular/core';
import { cardAnimation } from '@shared/utils/animations/router.animations';
import { NavigationLink } from '@models/template/NavigationLink';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
  animations: [ cardAnimation() ]
})
export class CardsComponent implements OnInit {

  @Input() cards: NavigationLink[];
  
  constructor(private router:Router) { }

  ngOnInit() {
  }

  gotoSeccion(url: string){
    this.router.navigate([url])
  }

  trackById(index, item) {
    return item.id;
  }

}
