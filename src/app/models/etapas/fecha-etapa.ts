import { Etapa } from './etapa';

export class FechaEtapa extends Etapa {
    fechaInicio?: Date;
    fechaTermino?: Date;

    constructor(nombre: string, valor: string, fechaInicio?: Date, fechaTermino?: Date) {
        super(nombre,valor);
        this.fechaInicio = fechaInicio;
        this.fechaTermino = fechaTermino;
    }
}