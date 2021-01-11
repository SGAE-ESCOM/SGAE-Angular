import { Grupo } from '@models/evaluacion/Grupo';

export interface Roles {
    aspirante?: boolean;
    admin?: boolean;
    root?: boolean;
}

export interface Estados {
    documentacion?: string;
    pago?: string;
    evaluacionConocimientos?: string;
    publicacionResultados?: string;
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
    alertas?: Array<string>;
    historialAplicacion?: string;
}