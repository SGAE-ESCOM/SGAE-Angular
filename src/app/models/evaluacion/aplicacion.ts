import { Evaluacion } from './evaluacion';

export class Aplicacion {
    id?: string;
    grupos: string[];
    fechaFormated: string;
    disponible: Boolean;
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
        this.aciertos = 0;
    }
}