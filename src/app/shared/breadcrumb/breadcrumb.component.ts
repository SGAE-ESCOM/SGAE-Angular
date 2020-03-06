import { Component } from '@angular/core';
import { Breadcrumb } from '@models/template/Breadcrumb';
import { BC_HOME } from '@routing/ListLinks';
import { fadeInDown } from '@shared/animations/router.animations';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
  animations: [fadeInDown()]
})
export class BreadcrumbComponent {

  static breadcrumb: Breadcrumb;
  public classReference = BreadcrumbComponent;

  constructor() {
    if (this.classReference.breadcrumb == null)
      this.classReference.breadcrumb = BC_HOME;
  }

  public static update(breadcrumb: Breadcrumb) {
    this.breadcrumb = breadcrumb;
  }

}