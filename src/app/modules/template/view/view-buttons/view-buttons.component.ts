import { Component } from '@angular/core';
import { BreadcrumbComponent } from '@breadcrumb/breadcrumb.component';
import { BD_BUTTONS } from '@breadcrumb/ListLinks';

@Component({
  selector: 'app-view-buttons',
  templateUrl: './view-buttons.component.html',
  styleUrls: ['./view-buttons.component.scss']
})
export class ViewButtonsComponent {
  constructor(){
    BreadcrumbComponent.update( BD_BUTTONS );
  }
}