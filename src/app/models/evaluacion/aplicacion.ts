import { Evaluacion } from './evaluacion';

export class Aplicacion {
    id?: string;
    grupo?: string;
    idGrupo?: string;
    nombre: string;
    evaluaciones: Evaluacion[];
    duracion: string;
    fechaInicio: Date;
    fechaTermino: Date;
    fechaInicioAplicacion?: string;
    fechaTerminoAplicacion?: string;
    aciertos: number;

    constructor(){
        this.idGrupo = '';
        this.grupo = '';
        this.nombre = '';
        this.evaluaciones = [];
        this.duracion = '';
        //this.tiempo = ;
        //this.fechaAplicacion = '';
        //this.minAciertos = '';
        //this.aciertos = '';
        
    }
}