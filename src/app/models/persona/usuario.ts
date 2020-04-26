export interface Roles {
    aspirante?: boolean;
    admin?: boolean;
    root?: boolean;
}

export interface Estados{
    documentacion?: string;
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
    permisos?: number;
}