import { Component, OnInit } from '@angular/core';
import { ControlDeEtapaService } from '@services/etapas/control-de-etapa.service';
import { CalendarData } from '@shared/components/calendario/interfaces/calendar-data';
import { BUSCAR_COLOR_ETAPAS } from "@models/etapas/colores-etapa.enum";

@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.scss']
})
export class LandingpageComponent implements OnInit {
  
  etapas: any[];
  fechasEtapas: CalendarData[];

  constructor(private _etapaService: ControlDeEtapaService ) {
    this.etapas = [];
  }

  ngOnInit() {
    this._etapaService.getFechasEtapas().then( querySnapshot => {
      if (!querySnapshot.empty){
        querySnapshot.forEach( doc => this.etapas.push([doc.id, doc.data()]) );
        this.fechasEtapas = this.etapas.map(([atributo, valor]: any, index) => {
          return {
            id: index,
            name: valor.nombre,
            startDate: new Date(valor.fechaInicio),
            endDate: new Date(valor.fechaTermino),
            color: BUSCAR_COLOR_ETAPAS[valor.color].valor
          }
        });
      }
    }).catch(err =>  console.error(err));
  }

}
