import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BreadcrumbComponent } from '@components/breadcrumb/breadcrumb.component';
import { IndicacionesGrupo } from '@models/Indicaciones/indicaciones-grupo';
import { AuthService } from '@services/auth.service';
import { GruposService } from '@services/evaluacion/grupos.service';
import { SweetalertService } from '@services/sweetalert/sweetalert.service';
import { comprobarPermisos, GESTION_USUARIOS, sinAcceso } from '@shared/admin-permissions/permissions';
import { BC_INDICACIONES_ASIGNACION, BC_SEGUIMIENTO, BC_USUARIOS } from '@shared/routing-list/ListLinks';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-indicaciones-asignacion',
  templateUrl: './indicaciones-asignacion.component.html',
  styleUrls: ['./indicaciones-asignacion.component.scss']
})
export class IndicacionesAsignacionComponent implements OnInit {

  grupos: IndicacionesGrupo[] = [];

  constructor(private _authServices: AuthService, private router: Router, private _grupos: GruposService, private _toast: ToastrService, private _swal: SweetalertService) {
    let usuario = this._authServices.getUsuarioC();
    BreadcrumbComponent.update(BC_USUARIOS);
    //Comprobar Permisos
    if(usuario.rol != 'root' && !comprobarPermisos(usuario, GESTION_USUARIOS, router)) sinAcceso(router);
    BreadcrumbComponent.update(BC_INDICACIONES_ASIGNACION);
  }

  ngOnInit(): void {
    //ObtenerGrupos
    this._grupos.get().subscribe(grupos => { this.grupos = grupos }).remove;
  }

  guardarIndicaciones(grupo: IndicacionesGrupo){
    try {
      this._grupos.updateIndicaciones(grupo);
      this._swal.informacionActualizada();
    }catch(error){
      this._toast.error("Ocurrio un error al actualizar la información. Intente mas tarde.");
    }
  }
}
