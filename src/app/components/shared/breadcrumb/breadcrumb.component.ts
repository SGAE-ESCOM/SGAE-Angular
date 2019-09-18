import { Component, Input } from '@angular/core';
import { Breadcrumb } from '../../../models/Breadcrumb';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent {

  @Input() breadcrumb:Breadcrumb;

  constructor() {
  }

}
