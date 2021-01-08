export class Etapa {
    id?: number;
    nombre: string = '';
    valor: string = '';

    constructor(nombre: string, valor: string, id?: number) {
        this.nombre = nombre;
        this.valor = valor;
        this.id = id || undefined;
    }
}