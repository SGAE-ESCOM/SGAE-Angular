import { Dato } from './dato';

export const OPC_NUMERO = 'número';
export const OPC_TEXTO = 'texto';

export class EnumTipoCampo implements Dato{
    nombre: string;
    descripcion: string;
    subtipos: Dato[];
    public static ALL: Dato[] = [];

    public static readonly NUMERO = new EnumTipoCampo(OPC_NUMERO,'Sólo se permiten números', null);
    public static readonly TEXTO = new EnumTipoCampo(OPC_TEXTO,'Permite caracteres alfanumericos', null);

    private constructor( nombre: string, descripcion:string, subtipos: Dato[] ){
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.subtipos = subtipos;
        EnumTipoCampo.ALL.push(this);
    }

}