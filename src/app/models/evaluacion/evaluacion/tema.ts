import { Pregunta } from './pregunta';

export class Tema{
    id?: string;
    idSeccion?: string;
    nombre?: string;
    total?: number;
    preguntas?: Pregunta[];

    constructor(nombre?: string, total?:number){
        this.nombre = nombre || '';
        this.total = total || 0;
    }
}