import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { LINKS_HOME } from '@routing/ListLinks';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '@services/auth.service';
import { Router } from '@angular/router';
import { fadeInDown } from '@shared/animations/router.animations';
import { UsuarioInterface } from '@models/persona/usuario';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  animations: [fadeInDown()]
})
export class SidenavComponent implements OnInit {

  usuario: UsuarioInterface = { nombres: '-', roles: null };
  mobileQuery: MediaQueryList;
  navigationLinks = LINKS_HOME['aspirante']; // admin; DEBUG //CAMBIAR A page EN PRODUCCION
  isLoggedIn: boolean = false; //true; DEBUG //CAMBIAR A false EN PRODUCCION
  shouldRun = true;

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
            if(this.usuario.rol === 'admin' || this.usuario.rol === 'root')
            this.navigationLinks = LINKS_HOME[usaurio.rol]
          } else {
            const infoUsuario = {
              uid: auth.uid,
              email: auth.email
            }
            this.router.navigate(['/registro-goolge'], { queryParams: { usuario: JSON.stringify(infoUsuario) } });
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
    this.router.navigate(['']);
  }

}