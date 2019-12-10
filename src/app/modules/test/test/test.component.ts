import { Component, OnInit } from '@angular/core';
import { BreadcrumbComponent } from "@breadcrumb/breadcrumb.component";
import { BC_TEST } from "@breadcrumb/ListLinks";

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  constructor() {
    BreadcrumbComponent.update(BC_TEST);
  }

  ngOnInit() {
  }

}
