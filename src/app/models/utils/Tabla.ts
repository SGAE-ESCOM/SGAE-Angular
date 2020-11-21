/**
 * Modelo de Tabla para creaar tablas dinamicas. Necesario un array de objetos con
 * atributos encabezado y json
 */
export class Tabla {
    /**
     * Encabezado que tendra dentro de la tabla
     */
    encabezado: string;
    /**
     * Valor del JSON, puede ser diferente al del encabezado
     */
    json: string;
    /**
     * Valor del property si es Array
     */
    property?: string;

    objectProperty?: string;
}