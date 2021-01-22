import { Component } from '@angular/core';
import { ControlDeEtapaService } from '@services/etapas/control-de-etapa.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'SGAE-angular';
  tiempoValido = true;

  constructor(private _control: ControlDeEtapaService) { }

  ngOnInit() {
    this._control.getHoraServidor().then( res => { this.tiempoValido = res });
  }
}
