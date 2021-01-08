import { ColorEtapa } from "./color-etapa"

const VERDE = new ColorEtapa('verde', '28a745');
const AZUL = new ColorEtapa('azul', '17a2b8');
const AMARILLO = new ColorEtapa('amarillo', 'EFB916');
const ROJO = new ColorEtapa('rojo', 'dc3545');
const MORADO = new ColorEtapa('morado', 'BB8FCE');
const NARANJA = new ColorEtapa('naranja', 'F5B041');
const TURQUESA = new ColorEtapa('turquesa', '40E0D0');

export const COLORES_ETAPAS = [ VERDE, AZUL, AMARILLO, ROJO, MORADO, NARANJA, TURQUESA ];

export const BUSCAR_COLOR_ETAPAS = {
    verde: VERDE,
    azul: AZUL,
    amarillo: AMARILLO,
    rojo: ROJO,
    morado: MORADO,
    naranja :NARANJA,
    turquesa: TURQUESA
}
