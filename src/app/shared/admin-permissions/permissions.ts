//PERMISOS ADMINISTRADOR

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