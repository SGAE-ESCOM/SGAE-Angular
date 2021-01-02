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
     * Valor del property raíz, puede ser primitivo u objeto
     */
    json: string;

    /**
     * Valor del property si es Array
     */
    property?: string;

    /**
     * Tipo de tabla
     *  - Primitivo: Necesita json
     *  - Objeto: Necesita json y property
     *  - Objeto con property: Necesita json, property y objectProperty
     *  - Array de primitivo: Necesita json
     *  - Array de Objeto con property: Necesita json y objectProperty
     */
    tipo?: TipoColumn;
}

export enum TipoColumn {
    //Casos de Objeto
    /**
     * @description Objeto con property
     * @usageNotes Necesita json
     * @example
     * objeto[json]
     */
    OBJETO,

    /**
     * 
     * @description Objeto con property
     * @usageNotes
     * Necesita json, property\n
     * @example
     * objeto[json][property]
     */
    OBJETO_PROPERTY,

    /**
     * @description Array de Objeto con primitivo
     * @description Necesita json
     * @example
     * objeto[json][i]
     */
    ARRAY_PRIMITIVO,
    
    /**
     * @description
     * Array de Objeto con property
     * @usageNotes
     * Necesita json y property
     * @example
     * objeto[json][i][property]
     */
    ARRAY_OBJETOS_PROPERTY,
}