import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BreadcrumbComponent } from '@components/breadcrumb/breadcrumb.component';
import { IndicacionesGrupo } from '@models/Indicaciones/indicaciones-grupo';
import { UsuarioInterface } from '@models/persona/usuario';
import { AuthService } from '@services/auth.service';
import { GruposService } from '@services/evaluacion/grupos.service';
import { sinAcceso } from '@shared/admin-permissions/permissions';
import { BC_HOME, BC_SEGUIMIENTO } from '@shared/routing-list/ListLinks';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';

@Component({
  selector: 'app-seguimiento',
  templateUrl: './seguimiento.component.html',
  styleUrls: ['./seguimiento.component.scss']
})
export class SeguimientoComponent implements OnInit {

  usuario: UsuarioInterface;
  indicaciones = "";

  //ElementosQR
  elementType = NgxQrcodeElementTypes.URL;
  correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
  value;


  constructor(private _authService: AuthService, private router: Router, private _grupos: GruposService) { 
    this.usuario = this._authService.getUsuarioC();
    //Comprobar Permisos
    BreadcrumbComponent.update(BC_HOME);
    if(this.usuario.rol != 'aspirante') sinAcceso(router);
    BreadcrumbComponent.update(BC_SEGUIMIENTO);
  }

  ngOnInit(): void {
    this.value = "<%" + this.usuario.id + "%>"

    try {
      this._grupos.getGrupoIndicaciones(this.usuario.grupo.id).then(grupo =>{
        let grupoAux = grupo.data();
        this.indicaciones = grupoAux.indicaciones;
      });
    } catch (error) {
      console.log(error);
    }
  }

  imprimirPantalla(){
    window.print();
  }

}
