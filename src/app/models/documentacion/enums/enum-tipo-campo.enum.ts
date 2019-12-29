import { Dato } from './dato';

export class EnumTipoCampo implements Dato{
    nombre: string;
    descripcion: string;
    subDato: Dato[];
    public static ALL: Dato[] = [];

    public static readonly NUMERO = new EnumTipoCampo('Número','Sólo se permiten números', null);
    public static readonly TEXTO = new EnumTipoCampo('Texto','Permite caracteres alfanumericos', null);

    private constructor( nombre: string, descripcion:string, subDato: Dato[] ){
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.subDato = subDato;
        EnumTipoCampo.ALL.push(this);
    }

}