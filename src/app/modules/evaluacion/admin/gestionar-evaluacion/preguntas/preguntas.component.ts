import { Component, OnInit } from '@angular/core';
import { BreadcrumbComponent } from '@components/breadcrumb/breadcrumb.component';
import { BC_PREGUNTAS } from '@shared/routing-list/ListLinks';

@Component({
  selector: 'app-preguntas',
  templateUrl: './preguntas.component.html',
  styleUrls: ['./preguntas.component.scss']
})
export class PreguntasComponent implements OnInit {

  constructor() {
    BreadcrumbComponent.update(BC_PREGUNTAS);
  }

  ngOnInit(): void {
  }

}
