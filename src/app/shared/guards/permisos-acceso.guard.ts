import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '@services/auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PermisosAccesoGuard implements CanActivate {

  constructor(private _authService: AuthService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean >  {
    let user: firebase.User = this._authService.getUsuario();
    return this._authService.findUsuario(user.uid).pipe(map(usuario => {
      console.log(usuario);
      if (!usuario) {
        this.router.navigate(['/login']);
        return true;
      }
      this._authService.setUsuarioC(usuario);
      return false;
    }));
  }

}
