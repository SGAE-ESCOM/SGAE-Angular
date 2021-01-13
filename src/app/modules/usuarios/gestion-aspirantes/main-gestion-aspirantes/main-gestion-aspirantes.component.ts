import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BreadcrumbComponent } from '@components/breadcrumb/breadcrumb.component';
import { AuthService } from '@services/auth.service';
import { EtapasService } from '@services/etapas/etapas.service';
import { comprobarPermisos, GESTION_USUARIOS, sinAcceso } from '@shared/admin-permissions/permissions';
import { BC_GESTION_ASPIRANTES, LINKS_GESTION_ASPIRANTES, LINKS_GESTION_ASPIRANTES_ALT } from '@shared/routing-list/ListLinks';

@Component({
  selector: 'app-main-gestion-aspirantes',
  templateUrl: './main-gestion-aspirantes.component.html',
  styleUrls: ['./main-gestion-aspirantes.component.scss']
})
export class MainGestionAspirantesComponent implements OnInit {

  cards;

  constructor(private _authServices: AuthService, private router: Router, private _etapas: EtapasService) { 
    let usuario = this._authServices.getUsuarioC();
    BreadcrumbComponent.update(BC_GESTION_ASPIRANTES);
    //Comprobar Permisos
    if(usuario.rol != 'root' && !comprobarPermisos(usuario, GESTION_USUARIOS, router)) sinAcceso(router);
    
    //ETAPA RESULTADOS EXISTE
    this._etapas.getEtapaResultados().then(res =>  {
      if(typeof res === 'undefined') this.cards = LINKS_GESTION_ASPIRANTES;
      else this.cards = LINKS_GESTION_ASPIRANTES_ALT;
    });
  }

  ngOnInit(): void {
  }

}
