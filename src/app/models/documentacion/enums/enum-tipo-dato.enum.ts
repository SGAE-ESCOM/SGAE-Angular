import { Dato } from './dato';
import { EnumTipoCampo } from './enum-tipo-campo.enum';
import { EnumTipoArchivo } from './enum-tipo-archivo.enum';

export class EnumTipoDato implements Dato{
    nombre: string;
    descripcion: string;
    subDato: Dato[];
    public static ALL: Dato[] = [];

    static readonly CAMPO = new EnumTipoDato('Campo','Se puede ingresar un valor a través del teclado', EnumTipoCampo.ALL);
    static readonly ARCHIVO = new EnumTipoDato('Archivo','Subir algún tipo de archivo', EnumTipoArchivo.ALL);
    static readonly SELECCION = new EnumTipoDato('Selección','Se puede ingresar un valor a través del teclado', null);
    static readonly FECHA = new EnumTipoDato('Fecha','Subir algún tipo de archivo', null);

    private constructor( nombre: string, descripcion:string, subDato: Dato[] ){
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.subDato = subDato;
        EnumTipoDato.ALL.push(this);
    }
}