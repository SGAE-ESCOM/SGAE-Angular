import { Component, OnInit } from '@angular/core';
import { BreadcrumbComponent } from '@components/breadcrumb/breadcrumb.component';
import { BC_INFO_KATEX } from '@shared/routing-list/ListLinks';

@Component({
  selector: 'app-info-katex',
  templateUrl: './info-katex.component.html',
  styleUrls: ['./info-katex.component.scss']
})
export class InfoKatexComponent implements OnInit {
  
  ecuacion =  '$c = \\pm \\sqrt{a^2 + b^2}$';
  ecuacionEjemplo = '$c = \\pm \\sqrt{a^2 + b^2}$';
  parrafoEjemplo = "You can write text, that contains expressions like this: $x ^ 2 + 5$ inside them. As you probably know. You also can write expressions in display mode as follows: $$\\sum_{i=1}^n(x_i^2 - \\overline{x}^2)$$. In first case you will need to use \\$expression\\$ and in the second one \\$\\$expression\\$\\$. To scape the \\$ symbol it's mandatory to write as follows: \\\\$"

  constructor() {
    BreadcrumbComponent.update(BC_INFO_KATEX);
  }

  ngOnInit(): void {
  }

  gotoKateAPI(){
    window.open('https://katex.org/docs/supported.html', "_blank");
  }

}
