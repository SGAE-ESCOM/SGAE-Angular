import { Dato } from './dato';
import { EnumTipoCampo } from './enum-tipo-campo.enum';
import { EnumTipoArchivo } from './enum-tipo-archivo.enum';
import { EnumTipoSeleccion } from './enum-tipo-seleccion.enum';
import { EnumTipoFecha } from './enum-tipo-fecha.enum';

export const OPC_TIPO_DATO = {
    CAMPO: 'campo',
    ARCHIVO: 'archivo',
    SELECCION: 'select',
    FECHA: 'fecha',
    DECISION: 'decision',
    OPCIONES: 'opciones'
};

export class EnumTipoDato implements Dato {
    nombre: string;
    descripcion: string;
    subtipos: Dato[];
    public static ALL: Dato[] = [];

    static readonly CAMPO = new EnumTipoDato(OPC_TIPO_DATO.CAMPO, 'Ingresar un valor a través del teclado', EnumTipoCampo.ALL);
    static readonly ARCHIVO = new EnumTipoDato(OPC_TIPO_DATO.ARCHIVO, 'Subir algún tipo de archivo. Tamaño máx. 250 KB', EnumTipoArchivo.ALL);
    static readonly SELECCION = new EnumTipoDato(OPC_TIPO_DATO.SELECCION, 'Selecciona valor entre opciones definidas', EnumTipoSeleccion.ALL);
    //static readonly FECHA = new EnumTipoDato(OPC_TIPO_DATO.FECHA, 'Subir algún tipo de archivo', EnumTipoFecha.ALL);

    private constructor(nombre: string, descripcion: string, subtipos: Dato[]) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.subtipos = subtipos;
        EnumTipoDato.ALL.push(this);
    }
}