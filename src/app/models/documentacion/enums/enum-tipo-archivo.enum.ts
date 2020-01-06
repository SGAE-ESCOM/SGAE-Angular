import { Dato } from './dato';

export const OPC_ARCHIVO = {
    IMAGEN : 'imagen',
    PDF: 'pdf'
};

export class EnumTipoArchivo implements Dato{
    nombre: string;
    descripcion: string;
    subtipos: Dato[];
    public static ALL: Dato[] = [];

    public static readonly IMAGEN = new EnumTipoArchivo(OPC_ARCHIVO.IMAGEN,'Imagenes de tipo JPEG', null);
    public static readonly PDF = new EnumTipoArchivo(OPC_ARCHIVO.PDF,'Archivos de tipo PDF', null);

    private constructor( nombre: string, descripcion:string, subtipos: Dato[] ){
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.subtipos = subtipos;
        EnumTipoArchivo.ALL.push(this);
    }

}