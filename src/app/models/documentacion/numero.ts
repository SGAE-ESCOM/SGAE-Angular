import { Campo } from './campo';

export class Numero implements Campo{
    nombre: string;
    requerido: boolean;
    valor: number;
    min?: number;
    max?: number;

    constructor( nombre: string, requerido: boolean, valor: number, min?: number, max?: number ){
        this.nombre = nombre;
        this.requerido = requerido;
        this.valor = valor;
        this.min = min || 0;
        this.max = max || null; 
    }
}
