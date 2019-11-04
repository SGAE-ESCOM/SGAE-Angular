import { Component, Input } from '@angular/core';
import { Breadcrumb } from '@app/models/template/Breadcrumb';
import { Link } from '@app/models/template/Link';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent {

  static breadcrumb: Breadcrumb;
  public classReference = BreadcrumbComponent;

  constructor() {
    this.classReference.breadcrumb = new Breadcrumb( "Home" );
  }

  public static update(link:Link, links:Link[]){
    this.breadcrumb = new Breadcrumb( link.name , links);
  }

}
