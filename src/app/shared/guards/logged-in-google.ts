import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AuthService } from '@services/auth.service';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoggedInGuard implements CanActivate {
  
  constructor(private authService: AuthService, private router:Router ){}
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.isAuth().pipe(
      map(user => {
        if(user){
          return user;
        }
        return user;
      }),
      mergeMap( res => {
        //console.log("Hola desde el loggedin")
        return this.authService.findUsuario(res.uid).pipe( map( usuarioCompleto => {
          /* console.log(res.uid);
          console.log(usuarioCompleto); */
          if(usuarioCompleto){
            this.router.navigate(['/app']);
            return false;
          }
          console.log("Navigating")
          const infoUsuario = {
            uid: res.uid,
            email: res.email
          }
          this.router.navigate(['/registro-goolge'], { queryParams: { usuario: JSON.stringify(infoUsuario) } });
          return true;
        }))
      }),
    );
  }
  
}
