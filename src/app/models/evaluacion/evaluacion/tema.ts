
export class Tema{
    id?: string;
    tema: string;
    subtema?: string[];

    constructor(tema: string, subtema?:string[]){
        this.tema = tema;
        this.subtema = subtema;
    }
}