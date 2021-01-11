import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from '@services/auth.service';
import { map, mergeMap } from 'rxjs/operators';
import { EtapasService } from '@services/etapas/etapas.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router:Router, private _etapas: EtapasService){}
  
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
          const infoUsuario = {
            uid: res.uid,
            email: res.email
          }
          this.router.navigate(['/registro-goolge'], { queryParams: { usuario: JSON.stringify(infoUsuario) } });
          return false;
        }))
      }),
      mergeMap( res => {
        return this._etapas.getFechasEtapasObserver().pipe( map( estadosAspirante => {
          if (estadosAspirante) {
            const etapas = estadosAspirante;
            this.authService.setEtapas(etapas);
          }
          return res;
        }));
      })
    );
  }
}
