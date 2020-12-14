import { NavigationLink } from '@models/template/NavigationLink';

export enum TipoAlert {
    ALERTA = "ALERTA",
    AVISO = "AVISO",
    CONFIRMACION = "CONFIRMACION",
}

export class Alert {
    nombre: string;
    descripcion: string;
    url: string;
    tipo: TipoAlert;

    constructor(nombre: string, descripcion: string, url: string, tipo: TipoAlert){ 
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.url = url;
        this.tipo = tipo;
    }
}