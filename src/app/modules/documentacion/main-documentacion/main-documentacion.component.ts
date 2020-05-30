import { Component, OnInit } from '@angular/core';
import { BreadcrumbComponent } from "@breadcrumb/breadcrumb.component";
import { BC_DOCUMENTACION, LINKS_DOCUMENTACION } from "@routing/ListLinks";
import { fallIn } from '@shared/animations/router.animations';
import { AuthService } from '@services/auth.service';
import { comprobarPermisos, GESTION_DOC } from '@shared/admin-permissions/permissions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-documentacion',
  templateUrl: './main-documentacion.component.html',
  styleUrls: ['./main-documentacion.component.scss'],
  animations: [ fallIn() ]
})
export class MainDocumentacionComponent implements OnInit {

  private usuario;
  cards;

  constructor(private _authServices: AuthService, private router: Router) {
    BreadcrumbComponent.update(BC_DOCUMENTACION);
    this.usuario = this._authServices.getUsuarioC();
    this.cards = LINKS_DOCUMENTACION[this.usuario.rol];
    if(this.usuario.rol != 'aspirante')
      comprobarPermisos(this.usuario, GESTION_DOC, router);
  }

  ngOnInit() {
  }

}
