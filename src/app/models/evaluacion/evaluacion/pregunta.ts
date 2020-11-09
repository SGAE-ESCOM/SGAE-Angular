export class Pregunta {
    id?: string;
    idTema?: string;
    enunciado?: string;
    img?: string;
    opciones: Opcion[];
    respuesta?: number;

    constructor(){
        this.id = '';
        this.idTema = '';
        this.enunciado = '';
        this.img = '';
        this.opciones = [];
    }
}

export class Opcion {
    id: number;
    enunciado: string;
    img?: string;
}