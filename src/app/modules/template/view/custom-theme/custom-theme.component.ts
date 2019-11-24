import { Component, OnInit } from '@angular/core';
import { BreadcrumbComponent } from "@breadcrumb/breadcrumb.component";
import { BD_CUSTOM_THEME } from "@breadcrumb/ListLinks";

@Component({
  selector: 'app-custom-theme',
  templateUrl: './custom-theme.component.html',
  styleUrls: ['./custom-theme.component.scss']
})
export class CustomThemeComponent implements OnInit {

  constructor() { 
    BreadcrumbComponent.update(BD_CUSTOM_THEME);
  }

  ngOnInit() {
  }

}
