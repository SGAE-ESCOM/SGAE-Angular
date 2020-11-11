import { Component, OnInit } from '@angular/core';
import { BreadcrumbComponent } from "@breadcrumb/breadcrumb.component";
import { BC_CONFIGURAR_REFERENCIAS } from '@shared/routing-list/ListLinks';

@Component({
  selector: 'app-configurar-referencias',
  templateUrl: './configurar-referencias.component.html',
  styleUrls: ['./configurar-referencias.component.scss']
})
export class ConfigurarReferenciasComponent implements OnInit {

  constructor() { 
    /***************** REVISAR PERMISOS *******************/

    BreadcrumbComponent.update(BC_CONFIGURAR_REFERENCIAS);
  }

  ngOnInit(): void {
    
  }

}
