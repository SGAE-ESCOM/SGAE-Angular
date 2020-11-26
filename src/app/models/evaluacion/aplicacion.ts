import { Evaluacion } from './evaluacion';

export class Aplicacion {
    id?: string;
    idGrupo?: string;
    nombre: string;
    evaluaciones: Evaluacion[];
    tiempo: number;
    fechaAplicacion: Date;
    minAciertos: boolean;
    aciertos: number;

    constructor(){
        this.id = '';
        this.idGrupo = '';
        this.nombre = '';
        this.evaluaciones = [];
        //this.tiempo = ;
        //this.fechaAplicacion = '';
        //this.minAciertos = '';
        //this.aciertos = '';
        
    }
}