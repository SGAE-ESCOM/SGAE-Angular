import { Dato } from './dato';

export const OPC_CAMPO = {
    NUMBER: 'number',
    TEXT: 'text'
};

export class EnumTipoCampo implements Dato {
    nombre: string;
    descripcion: string;
    subtipos: Dato[];
    public static ALL: Dato[] = [];

    public static readonly NUMERO = new EnumTipoCampo(OPC_CAMPO.NUMBER, 'Sólo se permiten números', null);
    public static readonly TEXTO = new EnumTipoCampo(OPC_CAMPO.TEXT, 'Permite caracteres alfanumericos', null);

    private constructor(nombre: string, descripcion: string, subtipos: Dato[]) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.subtipos = subtipos;
        EnumTipoCampo.ALL.push(this);
    }

}