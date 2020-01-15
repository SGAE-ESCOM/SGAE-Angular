export class Etapa{
    nombre: string = '';
    valor: string = '';
    fechaInicio: Date = new Date();
    fechaTermino: Date =  new Date();

    constructor( nombre: string, valor: string, fechaInicio?: Date, fechaTermino?: Date ){
        this.nombre = nombre;
        this.valor = valor;
        this.fechaInicio = fechaInicio;
        this.fechaTermino = fechaTermino;
    }
}