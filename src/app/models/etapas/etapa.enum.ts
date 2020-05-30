import { Etapa } from './etapa';

const DOCUMENTACION = new Etapa('Documentación', 'documentacion');
const EVALUACION = new Etapa('Evaluación de conocimientos', 'evaluacionConocimientos');
const PUBLICACION = new Etapa('Publicación de Resultados', 'publicacionResultados');
const PAGOS = new Etapa('Pagos', 'pagos');

export const ETAPAS_ESTADO_ASPIRANTE = [
    DOCUMENTACION, EVALUACION, PUBLICACION, PAGOS
];

export const ETAPAS_BUSCAR = {
    documentacion: DOCUMENTACION,
    evaluacionConocimientos: EVALUACION,
    publicacionResultados: PUBLICACION,
    pagos: PAGOS
}

export const ETAPAS = [new Etapa('Convocatoria', 'convocatoria'), new Etapa('Registro','registro')];