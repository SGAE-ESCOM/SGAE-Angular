import { Component, OnInit } from '@angular/core';
import { BreadcrumbComponent } from "@breadcrumb/breadcrumb.component";
import { BC_USUARIOS, LINKS_USUARIOS, LINKS_ROOT_USUARIOS } from "@routing/ListLinks";
import { comprobarPermisos, GESTION_USUARIOS } from '@shared/admin-permissions/permissions';
import { AuthService } from '@services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-usuarios',
  templateUrl: './main-usuarios.component.html',
  styleUrls: ['./main-usuarios.component.scss']
})
export class MainUsuariosComponent implements OnInit {

  cards;

  constructor(private _authServices: AuthService, private router: Router) { 
    let usuario = this._authServices.getUsuarioC();
    BreadcrumbComponent.update(BC_USUARIOS);
    if(usuario.rol == 'root') this.cards = LINKS_ROOT_USUARIOS;
    else if(comprobarPermisos(usuario, GESTION_USUARIOS, router)){
      this.cards = LINKS_USUARIOS;
    }
  }

  ngOnInit(): void {
  }

}
