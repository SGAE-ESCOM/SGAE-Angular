import { Dato } from './dato';

export class EnumTipoArchivo implements Dato{
    nombre: string;
    descripcion: string;
    subDato: Dato[];
    public static ALL: Dato[] = [];

    public static readonly IMAGEN = new EnumTipoArchivo('Imagen','Imagenes de tipo JPEG', null);
    public static readonly PDF = new EnumTipoArchivo('PDF','Archivos de tipo PDF', null);

    private constructor( nombre: string, descripcion:string, subDato: Dato[] ){
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.subDato = subDato;
        EnumTipoArchivo.ALL.push(this);
    }

}