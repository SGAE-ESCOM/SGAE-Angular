export class Resultado {
    id?:string;
    idUsuario: string;
    idAplicacion: string;
    nombre: string;
    fecha?: any;
    aciertos: any[];
    minAciertos: number;
    resultado?: ResultadoEnum;
    aciertosTotales : number;
}

export enum ResultadoEnum {
    APROBADO = "Aprobado",
    REPROBADO = "Reprobado"
}