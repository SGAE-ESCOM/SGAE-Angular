import { Etapa } from './etapa';

export class FechaEtapa extends Etapa {
    fechaInicio?: number;
    fechaTermino?: number;
    color?: string;

    constructor(nombre: string, valor: string, fechaInicio?: number, fechaTermino?: number) {
        super(nombre,valor);
        this.fechaInicio = fechaInicio;
        this.fechaTermino = fechaTermino;
    }
}