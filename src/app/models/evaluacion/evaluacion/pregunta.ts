export class Pregunta {
    id?: string;
    idTema?: string;
    enunciado: string;
    opciones: Respuesta[];
    respuesta?: number;
}

export class Respuesta {
    id: number;
    enunciado: string;
}