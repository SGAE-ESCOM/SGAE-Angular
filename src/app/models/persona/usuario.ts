export interface Roles {
    aspirante?: boolean;
    admin?: boolean;
    root?: boolean;
}

export interface UsuarioInterface {
    id?: string;
    nombres?: string;
    apellidos?: string;
    email?: string;
    password?: string;
    roles: Roles;
}