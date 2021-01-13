import { Etapa } from './etapa';

const DOCUMENTACION = new Etapa('Documentación', 'documentacion');
const EVALUACION = new Etapa('Evaluación de conocimientos', 'evaluacionConocimientos');
const PAGO = new Etapa('Pago', 'pago');
const PUBLICACION = new Etapa('Publicación de Resultados', 'publicacionResultados');

export const ETAPAS_ESTADO_ASPIRANTE = [
    DOCUMENTACION, EVALUACION, PAGO, PUBLICACION
];

export const ETAPAS_BUSCAR = {
    documentacion: DOCUMENTACION,
    evaluacionConocimientos: EVALUACION,
    publicacionResultados: PUBLICACION,
    pago: PAGO
}

export const ETAPAS = [new Etapa('Convocatoria', 'convocatoria', 0), new Etapa('Registro','registro', 1)];