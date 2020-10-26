
export class Tema{
    id?: string;
    tema: string;
    subtemas?: string[];

    constructor(tema: string, subtemas?:string[]){
        this.tema = tema;
        this.subtemas = subtemas || [];
    }
}