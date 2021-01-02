import { Evaluacion } from './evaluacion';
import { FechaAplicacion } from './fecha-aplicacion';

export class Aplicacion {
    id?: string;
    grupos: string[];
    fechasAplicacion: any;
    fechasAplicacionArray: any[];
    nombre: string;
    evaluaciones: Evaluacion[];
    duracion: string;
    aciertos: number;

    constructor(){
        this.nombre = '';
        this.evaluaciones = [];
        this.duracion = '';
        this.grupos = [];
        this.fechasAplicacion = {};
        this.fechasAplicacionArray = [];
        //this.tiempo = ;
        //this.fechaAplicacion = '';
        //this.minAciertos = '';
        //this.aciertos = '';
        
    }
}