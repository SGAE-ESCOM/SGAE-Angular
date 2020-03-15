import { Component, OnInit } from '@angular/core';
import { EtapasService } from '@services/etapas/etapas.service';

@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.scss']
})
export class LandingpageComponent implements OnInit {
  
  etapas: any[];

  constructor(private _etapaService: EtapasService) {
    this.etapas = [];
  }

  ngOnInit() {
    this._etapaService.getFechasEtapas().then( querySnapshot => {
      console.log(querySnapshot.empty);
      if (!querySnapshot.empty){
        console.log(querySnapshot.empty);
        querySnapshot.forEach( doc => this.etapas.push([doc.id, doc.data()]) );
        console.log(this.etapas);
      }
    }).catch(err =>  console.error(err));
  }

}
