
export class Tema{
    id?: string;
    idSeccion?: string;
    nombre?: string;
    total?: number;

    constructor(nombre?: string, total?:number){
        this.nombre = nombre || '';
        this.total = total || 0;
    }
}