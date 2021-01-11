import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { getCardsByEtapas, LINKS_HOME } from '@routing/ListLinks';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '@services/auth.service';
import { Router } from '@angular/router';
import { fadeInDown } from '@shared/utils/animations/router.animations';
import { UsuarioInterface } from '@models/persona/usuario';
import { getNavigationLinksAdmin } from '@shared/admin-permissions/permissions';
import { getAlertas } from '@shared/alertas/Alerts';
import { Alert, TipoAlert } from '@models/utils/Alert';
import { UsuarioService } from '@services/usuario/usuario.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  animations: [fadeInDown()]
})
export class SidenavComponent implements OnInit {

  usuario: UsuarioInterface = { nombres: '-', roles: null, alertas: [] , id: ''};
  alertas: Array<Alert>;
  tipoAlerta: any =  TipoAlert;
  mobileQuery: MediaQueryList;
  navigationLinks = LINKS_HOME['page']; // admin; DEBUG //CAMBIAR A page EN PRODUCCION
  isLoggedIn: boolean = false; //true; DEBUG //CAMBIAR A false EN PRODUCCION
  shouldRun = true;


  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private _usuarioService: UsuarioService,
    private _authService: AuthService, private _afsAuth: AngularFireAuth, private router: Router) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.alertas = new Array();
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  ngOnInit() {
    this.getUsuarioActual(); //QUITAR COMENTARIO EN PRODUCCION
  }

  getUsuarioActual() {
    this._authService.isAuth().subscribe(auth => {
      if (auth) {
        /* this.usuario = this._authService.getUsuarioC();
        this.isLoggedIn = true;  
        if(typeof this.usuario.alertas !== 'undefined') 
          this.alertas = getAlertas(this.usuario.alertas);

        if(this.usuario.rol === 'root' || this.usuario.rol === 'aspirante' )
          this.navigationLinks = getCardsByEtapas(this.usuario.rol, this._authService.getEtapas() );
        else if(this.usuario.rol === 'admin')
          this.navigationLinks = getNavigationLinksAdmin(this.usuario.permisos); */

        this._authService.findUsuario(auth.uid).subscribe((usaurio: UsuarioInterface) => {
          if (usaurio) {
            this._authService.setUsuarioC(usaurio);
            this.usuario = usaurio;
            this.isLoggedIn = true;
            
            if(typeof usaurio.alertas !== 'undefined') 
              this.alertas = getAlertas(usaurio.alertas);

            if(usaurio.rol === 'root'){
              this.navigationLinks = getCardsByEtapas(usaurio.rol, this._authService.getEtapas() );
            }
            else if(usaurio.rol === 'aspirante'){
              let resultadosActive = false;
              if ((typeof usaurio.estado !== 'undefined') && (typeof usaurio.estado.publicacionResultados !== 'undefined'))
                resultadosActive = usaurio.estado.publicacionResultados == 'validada';
              this.navigationLinks = getCardsByEtapas(usaurio.rol, this._authService.getEtapas(), resultadosActive);
            }
            else if(usaurio.rol === 'admin')
              this.navigationLinks = getNavigationLinksAdmin(usaurio.permisos);
          }
        }, error => { });
      } else {
        this.isLoggedIn = false;
        this.navigationLinks = LINKS_HOME['page'];
      }
    });
  }

  onLogout() {
    this._afsAuth.auth.signOut();
    this.alertas = new Array<Alert>();
    this.isLoggedIn = false;
    this.navigationLinks = LINKS_HOME['page'];
    this.router.navigate(['']);
  }

  onClickAlerta(alerta: Alert) {
    if(alerta.removerOnClick){
      try { this.usuario.alertas = this._usuarioService.removerAlerta(this.usuario, alerta); } 
      catch (error) { console.log(error); }
    }
    this.router.navigate([alerta.url]);
  }
}