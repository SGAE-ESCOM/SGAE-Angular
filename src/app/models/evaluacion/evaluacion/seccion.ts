export class Seccion {
    id?: string;
    nombre: string;

    constructor(nombre?: string) {
        this.nombre = nombre || '';
    }
}