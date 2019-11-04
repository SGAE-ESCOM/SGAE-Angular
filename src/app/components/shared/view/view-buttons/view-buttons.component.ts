import { Component } from '@angular/core';
import { BreadcrumbComponent } from '@app/components/shared/breadcrumb/breadcrumb.component';
import { ListLinks } from '@app/components/shared/breadcrumb/ListLinks';


@Component({
  selector: 'app-view-buttons',
  templateUrl: './view-buttons.component.html',
  styleUrls: ['./view-buttons.component.scss']
})
export class ViewButtonsComponent {
  constructor(){
    BreadcrumbComponent.update( ListLinks.BUTTONS, [ListLinks.HOME]);
  }
}