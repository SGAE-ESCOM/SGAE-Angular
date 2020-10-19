import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from '@services/auth.service';
import { map, mergeMap } from 'rxjs/operators';
import { PermisosAccesoGuard } from './permisos-acceso.guard';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router:Router, private permisosAccesoGuard:PermisosAccesoGuard){}
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.userData$.pipe(
      map(user => {
        if(!user){
          this.router.navigate(['/login']);
          return user;
        }
        return user;
      }),
      mergeMap( res => {
        return this.authService.findUsuario(res.uid).pipe( map( usuarioCompleto => {
          if(usuarioCompleto){
            this.authService.setUsuarioC(usuarioCompleto);
            this.authService.setUsuario(res);
            return true;
          }
          return false;
        }))
      })
    );
  }
}
