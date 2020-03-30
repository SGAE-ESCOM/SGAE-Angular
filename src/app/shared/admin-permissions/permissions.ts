//PERMISOS ADMINISTRADOR

export const GESTION_USUARIOS:number = 1;
export const GESTION_ETAPAS:number = 2;
export const PAGOS:number = 4;
export const CONVOCATORIA:number = 8;
export const EVALUACION:number = 16;
export const DOCUMENTACION:number = 32;

export const PERMISOS_ADMIN: any[] = [
    { nombre: "Todos", valor: 63},
    { nombre: "Gestión de usuarios", valor: 1 },
    { nombre: "Gestión de etapas", valor: 2 },
    { nombre: "Gestión de pagos", valor: 4 },
    { nombre: "Gestión de convocatoria", valor: 8 },
    { nombre: "Gestión de evaluación", valor: 16 },
    { nombre: "Gestión de documentación", valor: 32 }
];