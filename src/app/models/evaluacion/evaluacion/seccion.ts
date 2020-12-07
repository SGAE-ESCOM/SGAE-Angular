import { Pregunta } from './pregunta';

export class Seccion {
    id?: string;
    nombre: string;
    preguntas?: Pregunta[];

    constructor(nombre?: string) {
        this.nombre = nombre || '';
    }
}