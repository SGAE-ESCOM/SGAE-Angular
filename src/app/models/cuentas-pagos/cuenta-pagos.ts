export class CuentaPagos {
    id: string;
    nombre: string;
    banco: string;
    noCuenta: string;
    referencia?: string;

    constructor(id: string, nombre: string, banco: string, noCuenta: string, referencia?: string) {
        this.id = id;
        this.nombre = nombre;
        this.banco = banco;
        this.noCuenta = noCuenta;
        this.referencia = referencia;
    }
}