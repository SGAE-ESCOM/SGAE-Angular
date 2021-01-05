import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BreadcrumbComponent } from "@breadcrumb/breadcrumb.component";
import { AuthService } from '@services/auth.service';
import { comprobarPermisos, GESTION_PAGOS, sinAcceso } from '@shared/admin-permissions/permissions';
import { BC_CONFIGURAR_REFERENCIAS, BC_PAGOS } from '@shared/routing-list/ListLinks';

@Component({
  selector: 'app-configurar-referencias',
  templateUrl: './configurar-referencias.component.html',
  styleUrls: ['./configurar-referencias.component.scss']
})
export class ConfigurarReferenciasComponent implements OnInit {

  constructor(private router: Router, private _authServices: AuthService) { 
    let usuario = this._authServices.getUsuarioC();
    //Comprobar Permisos
    BreadcrumbComponent.update(BC_PAGOS);
    if(usuario.rol != 'root' && !comprobarPermisos(usuario, GESTION_PAGOS, router)) sinAcceso(router);

    BreadcrumbComponent.update(BC_CONFIGURAR_REFERENCIAS);
  }

  ngOnInit(): void {
    
  }

}
