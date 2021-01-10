export class EvidenciaPago {
    archivo: string;
    nombre: string;
    comentarios: string;
    valido: boolean;

    constructor( archivo: string = "", nombre: string = "", comentarios: string = "", valido: boolean = false){
        this.archivo = archivo;
        this.nombre = nombre;
        this.comentarios = comentarios;
        this.valido = valido;
    }
}

