import { Dato } from './dato';

export const OPC_FECHA = {
    RANGO : 'rango'
};

export class EnumTipoFecha implements Dato{
    nombre: string;
    descripcion: string;
    subtipos: Dato[];
    public static ALL: Dato[] = [];

    public static readonly IMAGEN = new EnumTipoFecha(OPC_FECHA.RANGO,'Elegir una fecha dentro del rango', null);

    private constructor( nombre: string, descripcion:string, subtipos: Dato[] ){
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.subtipos = subtipos;
        EnumTipoFecha.ALL.push(this);
    }

}