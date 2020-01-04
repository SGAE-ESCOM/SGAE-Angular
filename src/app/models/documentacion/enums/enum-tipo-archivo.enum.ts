import { Dato } from './dato';

export class EnumTipoArchivo implements Dato{
    nombre: string;
    descripcion: string;
    subtipos: Dato[];
    public static ALL: Dato[] = [];

    public static readonly IMAGEN = new EnumTipoArchivo('Imagen','Imagenes de tipo JPEG', null);
    public static readonly PDF = new EnumTipoArchivo('PDF','Archivos de tipo PDF', null);

    private constructor( nombre: string, descripcion:string, subtipos: Dato[] ){
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.subtipos = subtipos;
        EnumTipoArchivo.ALL.push(this);
    }

}