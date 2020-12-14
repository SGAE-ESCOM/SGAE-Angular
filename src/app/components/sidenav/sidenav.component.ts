import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef, AfterViewInit, Renderer2 } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { LINKS_HOME } from '@routing/ListLinks';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '@services/auth.service';
import { Router } from '@angular/router';
import { fadeInDown } from '@shared/utils/animations/router.animations';
import { UsuarioInterface } from '@models/persona/usuario';
import { getNavigationLinksAdmin } from '@shared/admin-permissions/permissions';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { ALERTAS } from '@shared/alertas/Alerts';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  animations: [fadeInDown()]
})
export class SidenavComponent implements OnInit {

  usuario: UsuarioInterface = { nombres: '-', roles: null, alertas: [] };
  mobileQuery: MediaQueryList;
  navigationLinks = LINKS_HOME['aspirante']; // admin; DEBUG //CAMBIAR A page EN PRODUCCION
  isLoggedIn: boolean = false; //true; DEBUG //CAMBIAR A false EN PRODUCCION
  shouldRun = true;

  //Variables alertas
  alertas: boolean = false;

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,
    private _authService: AuthService, private _afsAuth: AngularFireAuth,
    private router: Router) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
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
        this._authService.findUsuario(auth.uid).subscribe((usaurio: UsuarioInterface) => {
          if (usaurio) {
            this._authService.setUsuarioC(usaurio);
            this.usuario = usaurio;
            this.isLoggedIn = true;
            if(usaurio.rol === 'root' || usaurio.rol === 'aspirante' )
              this.navigationLinks = LINKS_HOME[usaurio.rol];
            else if(usaurio.rol === 'admin')
              this.navigationLinks = getNavigationLinksAdmin(usaurio.permisos);
          } else {
            const infoUsuario = {
              uid: auth.uid,
              email: auth.email
            }
            this.router.navigate(['/registro-goolge'], { queryParams: { usuario: JSON.stringify(infoUsuario) } });
          }
          console.log(this.usuario.alertas);
        }, error => { });
      } else {
        this.isLoggedIn = false;
        this.navigationLinks = LINKS_HOME['page'];
      }
    });
  }

  onLogout() {
    this._afsAuth.auth.signOut();
    this.isLoggedIn = false;
    this.navigationLinks = LINKS_HOME['page'];
    this.router.navigate(['']);
  }

}