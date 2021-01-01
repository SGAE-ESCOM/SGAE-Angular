import { Grupo } from "./Grupo";

export class FechaAplicacion {
    id?: number;
    grupo: Grupo;
    fechaInicio?: Date;
    fechaTermino?: Date;

    constructor(grupo?: Grupo,fechaInicio?: Date, fechaTermino?: Date) {
        this.grupo = grupo || new Grupo();
        this.fechaInicio = fechaInicio || new Date();
        this.fechaTermino = fechaTermino || new Date();
    }
}