import { Campo } from './campo';
import { EnumTipoDato } from "@models/documentacion/enums/enum-tipo-dato.enum";
import { EnumTipoCampo } from "@models/documentacion/enums/enum-tipo-campo.enum";

export class Texto implements Campo{
    nombre: string;
    requerido: boolean;
    tipo: string = EnumTipoDato.CAMPO.nombre;
    subtipo: string = EnumTipoCampo.TEXTO.nombre;
    min?: number;   
    max?: number;
    
    constructor( nombre: string, requerido: boolean, subtipo: string, min?: number, max?: number ){
        this.nombre = nombre;
        this.requerido = requerido;
        this.subtipo = subtipo;
        this.min = min || null;
        this.max = max || null;
    }
}
