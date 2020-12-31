
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
    removerOnClick: boolean;

    constructor(nombre: string, mensaje: string, url: string, tipo: TipoAlert, removerOnClick: boolean = false){ 
        this.nombre = nombre;
        this.mensaje = mensaje;
        this.url = url;
        this.tipo = tipo;
        this.removerOnClick = removerOnClick;
    }
}