import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { linksPage, linksAdmin, linksRoot, linksAspirante } from '@routing/ListLinks';
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
  navigationLinks = linksRoot; // linksRoot; DEBUG //CAMBIAR A linksPage EN PRODUCCION
  isLoggedIn: boolean = true; //true; DEBUG //CAMBIAR A false EN PRODUCCION

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

  shouldRun = true;

  ngOnInit() {
    //this.getUsuarioActual(); //QUITAR COMENTARIO EN PRODUCCION
  }

  getUsuarioActual() {
    this._authService.isAuth().subscribe(auth => {
      if (auth) {
        this._authService.getUsuario(auth.uid).subscribe((data: UsuarioInterface) => {
          if (data) {
            this.usuario = data;
            this.isLoggedIn = true;
            console.log(data.roles);
            if (data.roles.aspirante != null) {
              this.navigationLinks = linksAspirante;
            } else {
              if (data.roles.root != null ) {
                this.navigationLinks = linksRoot;
              }else{
                this.navigationLinks = linksAdmin;
              }
            }
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
        this.navigationLinks = linksPage;
      }
    });
  }

  onLogout() {
    this._afsAuth.auth.signOut();
    this.router.navigate(['']);
  }

}