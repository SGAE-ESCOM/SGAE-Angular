import { Grupo } from '@models/evaluacion/Grupo';

export interface Roles {
    aspirante?: boolean;
    admin?: boolean;
    root?: boolean;
}

export interface Estados {
    documentacion?: string;
    pagos?: string;
}

export interface UsuarioInterface {
    id?: string;
    nombres?: string;
    apellidos?: string;
    email?: string;
    password?: string;
    estado?: Estados;
    roles?: Roles;
    rol?: string;
    grupo?: Grupo;
    permisos?: number;
}