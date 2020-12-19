import { Tema } from './evaluacion/tema';

export class Evaluacion {
    id?: string;
    nombre: string;
    temas: Tema[];
    total?: number;
    preguntas?: any[];
}