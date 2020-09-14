//PERMISOS ADMINISTRADOR
import { HOME, DOCUMENTACION, EVALUACION, PAGOS, ETAPAS, USUARIOS, CONVOCATORIA } from '@routing/ListLinks';

export const GESTION_USUARIOS: number = 1;   //000001
export const GESTION_ETAPAS: number = 2;     //000010
export const GESTION_PAGOS: number = 4;      //000100
export const GESTION_CONV: number = 8;       //001000
export const GESTION_EVAL: number = 16;      //010000
export const GESTION_DOC: number = 32;       //100000

export const PERMISOS_ADMIN: any[] = [
    { nombre: "Todos", valor: 63 },          //111111
    { nombre: "Gestión de usuarios", valor: 1 },
    { nombre: "Gestión de etapas", valor: 2 },
    { nombre: "Gestión de pagos", valor: 4 },
    { nombre: "Gestión de convocatoria", valor: 8 },
    { nombre: "Gestión de evaluación", valor: 16 },
    { nombre: "Gestión de documentación", valor: 32 }
];

export function comprobarPermisos(user, permiso, router) {
    switch (user.rol) {
        case 'root':
            return true;
        case 'admin':
            if ((user.permisos & permiso) > 0)
                return true;
            router.navigate(['  ']);
            return false;
        case 'aspirante':
            router.navigate(['/app']);
            return false;
        default:
            router.navigate(['/app']);
            return false;
    }
}

export function sinAcceso(router) {
    router.navigate(['/app']);
    return false;
}

export function isAdministrador(rol: string) {
    return rol == 'admin' || rol == 'root' ? true : false;
}

export function getNavigationLinksAdmin(permisos) {
    let navigationLinks = [HOME];
    if ((permisos & GESTION_DOC) > 0) navigationLinks.push(DOCUMENTACION);
    if ((permisos & GESTION_EVAL) > 0) navigationLinks.push(EVALUACION);
    if ((permisos & GESTION_PAGOS) > 0) navigationLinks.push(PAGOS);
    if ((permisos & GESTION_ETAPAS) > 0) navigationLinks.push(ETAPAS);
    if ((permisos & GESTION_CONV) > 0) navigationLinks.push(CONVOCATORIA);
    if ((permisos & GESTION_USUARIOS) > 0) navigationLinks.push(USUARIOS);
    return navigationLinks;
}