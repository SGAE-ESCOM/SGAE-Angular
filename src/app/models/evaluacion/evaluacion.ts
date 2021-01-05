import { Tema } from './evaluacion/tema';

export class Evaluacion {
    id?: string;
    nombre: string;
    temas: Tema[];
    secciones: string[];
    total?: number;
    preguntas?: any[];
}