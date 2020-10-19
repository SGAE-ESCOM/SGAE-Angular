import { Dato } from './dato';

export const OPC_SELECCION = {
    UNICA: 'unica',
    MULTIPLE: 'multiple'
};

export class EnumTipoSeleccion implements Dato {
    nombre: string;
    descripcion: string;
    subtipos: Dato[];
    public static ALL: Dato[] = [];

    public static readonly UNICA = new EnumTipoSeleccion(OPC_SELECCION.UNICA, 'Sólo se puede elegir una opción', null);
    public static readonly MULTIPLE = new EnumTipoSeleccion(OPC_SELECCION.MULTIPLE, 'Se pueden elegir multiples opciones', null);

    private constructor(nombre: string, descripcion: string, subtipos: Dato[]) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.subtipos = subtipos;
        EnumTipoSeleccion.ALL.push(this);
    }

}