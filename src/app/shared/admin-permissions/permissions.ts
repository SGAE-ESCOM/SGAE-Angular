//PERMISOS ADMINISTRADOR
import { Injectable } from '@angular/core';
import { UsuarioInterface } from '@models/persona/usuario';
import { AuthService } from '@services/auth.service';
import { Router } from '@angular/router';
import { UsuarioService } from '@services/usuario/usuario.service';

export const GESTION_USUARIOS:number = 1;   //000001
export const GESTION_ETAPAS:number = 2;     //000010
export const PAGOS:number = 4;              //000100
export const CONVOCATORIA:number = 8;       //001000
export const EVALUACION:number = 16;        //010000
export const DOCUMENTACION:number = 32;     //100000

export const PERMISOS_ADMIN: any[] = [
    { nombre: "Todos", valor: 63},          //111111
    { nombre: "Gestión de usuarios", valor: 1 },
    { nombre: "Gestión de etapas", valor: 2 },
    { nombre: "Gestión de pagos", valor: 4 },
    { nombre: "Gestión de convocatoria", valor: 8 },
    { nombre: "Gestión de evaluación", valor: 16 },
    { nombre: "Gestión de documentación", valor: 32 }
];

@Injectable({
    providedIn: 'root'
})
export class AccesosAdministrador {

    private usuario;

    constructor(private _authServices: AuthService, private router: Router) { 
        this.usuario = this._authServices.getUsuarioC();
    }

    private acceso(PERMISO){
        let user = this.usuario;
        switch(user.rol){
            case 'root':
                return true;
            case 'admin':
                if((user.permisos & PERMISO) > 0)
                    return true;
                this.router.navigate(['/app/acceso-restringido']);
                return false;
            case 'aspirante':
                this.router.navigate(['/app']);
                return false;
            default:
                this.router.navigate(['/app']);
                return false;
        }
    }
    
    accesoUsuarios(){
        return this.acceso(GESTION_USUARIOS);
    }

    accesoEtapas(){
        return this.acceso(GESTION_ETAPAS);
    }

    accesoPagos(){
        return this.acceso(PAGOS);
    }

    accesoConvocatoria(){
        return this.acceso(CONVOCATORIA);
    }

    accesoEvaluacion(){
        return this.acceso(EVALUACION);
    }

    accesoDocumentacion(){
        return this.acceso(DOCUMENTACION);
    }

    isAdministrador(rol: string){
        return rol == 'admin' || rol == 'root' ? true : false;
    }
    
}