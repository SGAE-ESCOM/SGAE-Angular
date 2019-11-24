import { Component, Input } from '@angular/core';
import { Breadcrumb } from '@models/template/Breadcrumb';
import { BC_HOME } from '@breadcrumb/ListLinks';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent {

  static breadcrumb: Breadcrumb;
  public classReference = BreadcrumbComponent;

  constructor() {
    this.classReference.breadcrumb = BC_HOME;
  }

  public static update(breadcrumb: Breadcrumb) {
    this.breadcrumb = breadcrumb;
  }

}