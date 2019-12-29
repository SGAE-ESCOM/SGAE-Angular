export interface Dato {
    nombre: string;
    descripcion: string;
    subDato: Dato[];
}