export class CuentaPagos {
    id: string;
    nombre: string;
    banco: string;
    noCuenta: string;
    estado: string;
    referencia?: string;

    constructor(id: string, nombre: string, banco: string, noCuenta: string, estado: string = "pendiente", referencia?: string) {
        this.id = id;
        this.nombre = nombre;
        this.banco = banco;
        this.noCuenta = noCuenta;
        this.estado = estado;
        this.referencia = referencia;
    }
}