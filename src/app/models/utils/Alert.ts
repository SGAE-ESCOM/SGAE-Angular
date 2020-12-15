
export enum TipoAlert {
    ALERTA = "ALERTA",
    AVISO = "AVISO",
    CONFIRMACION = "CONFIRMACION",
}

export class Alert {
    nombre: string;
    mensaje: string;
    url: string;
    tipo: TipoAlert;

    constructor(nombre: string, mensaje: string, url: string, tipo: TipoAlert){ 
        this.nombre = nombre;
        this.mensaje = mensaje;
        this.url = url;
        this.tipo = tipo;
    }
}