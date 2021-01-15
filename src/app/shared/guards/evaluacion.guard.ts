import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { FechaEtapa } from '@models/etapas/fecha-etapa';
import { AuthService } from '@services/auth.service';
import { MSJ_ERROR_ETAPA_FUERA_TIEMPO, MSJ_ERROR_ETAPA_NO_DEFINIDA } from '@shared/utils/mensajes';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EvaluacionGuard implements CanActivate {

  constructor(private _auth: AuthService, private _toastr: ToastrService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const etapa:FechaEtapa = this._auth.getEtapas()['evaluacionConocimientos'];
      if (etapa){
        if( this._auth.getUsuarioC().rol === 'aspirante' ){
          const fechaHoy = new Date().getTime();
          if( fechaHoy >= etapa.fechaInicio && fechaHoy <= etapa.fechaTermino)
            return true;
          else{
            this._toastr.error(MSJ_ERROR_ETAPA_FUERA_TIEMPO);
            return false;
          }
        }else{
          return true;
        }
      }else{
        this._toastr.error(MSJ_ERROR_ETAPA_NO_DEFINIDA);
        return false;
      }
  }

}
