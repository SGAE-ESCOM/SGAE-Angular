import { Campo } from './campo';
import { EnumTipoDato } from "@models/documentacion/enums/enum-tipo-dato.enum";
import { EnumTipoCampo } from "@models/documentacion/enums/enum-tipo-campo.enum";

export class Numero implements Campo{
    nombre: string;
    requerido: boolean;
    tipo: string = EnumTipoDato.CAMPO.nombre;
    subtipo: string = EnumTipoCampo.NUMERO.nombre;
    min?: number;
    max?: number;

    constructor( nombre: string, requerido: boolean, min?: number, max?: number ){
        this.nombre = nombre;
        this.requerido = requerido;
        this.min = min || null;
        this.max = max || null; 
    }
}
