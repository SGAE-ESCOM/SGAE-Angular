import { Dato } from './dato';

export const OPC_CAMPO = {
    NUMERO: 'número',
    TEXTO: 'texto'
};

export class EnumTipoCampo implements Dato {
    nombre: string;
    descripcion: string;
    subtipos: Dato[];
    public static ALL: Dato[] = [];

    public static readonly NUMERO = new EnumTipoCampo(OPC_CAMPO.NUMERO, 'Sólo se permiten números', null);
    public static readonly TEXTO = new EnumTipoCampo(OPC_CAMPO.TEXTO, 'Permite caracteres alfanumericos', null);

    private constructor(nombre: string, descripcion: string, subtipos: Dato[]) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.subtipos = subtipos;
        EnumTipoCampo.ALL.push(this);
    }

}