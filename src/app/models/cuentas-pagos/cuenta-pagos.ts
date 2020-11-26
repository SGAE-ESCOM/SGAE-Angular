export class CuentaPagos {
    id?: string;
    nombre?: string;
    banco?: string;
    noCuenta?: string;
    estado?: string;
    referencia?: string;
    datosAds?: {}[];
    gruposIds?: string[];

    constructor(nombre?: string, banco?: string, noCuenta?: string, estado?: string, referencia?: string) {
        this.nombre = nombre;
        this.banco = banco;
        this.noCuenta = noCuenta;
        this.estado = estado;
        this.referencia = referencia;
    }
}