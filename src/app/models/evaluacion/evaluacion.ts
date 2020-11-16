import { Tema } from './evaluacion/tema';
import { Grupo } from './Grupo';

export class Evaluacion {
    id?: string;
    nombre: string;
    grupose: Grupo[];
    temas: Tema[];
}