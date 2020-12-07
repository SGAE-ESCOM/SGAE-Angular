export class CuentaPagos {
    id?: string;
    nombre?: string;
    banco?: string;
    noCuenta?: string;
    cantidad?: string;
    estado?: string;
    referencia?: string;
    datosAds?: {}[];
    gruposIds?: string[];

    constructor(nombre?: string, banco?: string, noCuenta?: string, cantidad?: string, estado?: string, referencia?: string) {
        this.nombre = nombre;
        this.banco = banco;
        this.noCuenta = noCuenta;
        this.cantidad = cantidad;
        this.estado = estado;
        this.referencia = referencia;
    }
}