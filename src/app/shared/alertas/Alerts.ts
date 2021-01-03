import { Alert, TipoAlert } from "@models/utils/Alert";
import * as ListLinks from '@shared/routing-list/ListLinks';

export const ALERTAS = new Map();

export function getAlertas(names: Array<string>): Array<Alert> {
    let alerts : Array<Alert> = new Array();
    names.forEach(name => alerts.push(ALERTAS.get(name)));
    return alerts;
}

export function removerAlerta(alertas: Array<string>, alerta: Alert){
    let index = alertas.indexOf(alerta.nombre, 0);
    if (index > -1) alertas.splice(index, 1);
    return alertas;
}

export function removerGrupoAlertas(alertas: Array<string>, grupoAlertas: Alert[]){
    grupoAlertas.forEach(alerta => {
        let index = alertas.indexOf(alerta.nombre, 0);
        if (index > -1) alertas.splice(index, 1);
    });
    return alertas;
}

/************************************************ DOCUMENTACION ********************************************************************************************/

const NAME_INICIO_ETAPA_DOCUMENTACION = "INICIO_ETAPA_DOCUMENTACION";
export const INICIO_ETAPA_DOCUMENTACION = new Alert(NAME_INICIO_ETAPA_DOCUMENTACION, "Inicio la etapa para subir documentacion.", "", TipoAlert.AVISO);
ALERTAS.set(NAME_INICIO_ETAPA_DOCUMENTACION, INICIO_ETAPA_DOCUMENTACION);

const NAME_DOCUMENTACION_INVALIDA = "DOCUMENTACION_INVALIDA";
export const DOCUMENTACION_INVALIDA = new Alert(NAME_DOCUMENTACION_INVALIDA, "Documentacion rechazada.", "", TipoAlert.ALERTA);
ALERTAS.set(NAME_DOCUMENTACION_INVALIDA, DOCUMENTACION_INVALIDA);

const NAME_DOCUMENTACION_CORRECTA = "DOCUMENTACION_CORRECTA";
export const DOCUMENTACION_CORRECTA = new Alert(NAME_DOCUMENTACION_CORRECTA, "Documentación aprobada.", "", TipoAlert.CONFIRMACION, true);
ALERTAS.set(NAME_DOCUMENTACION_CORRECTA, DOCUMENTACION_CORRECTA);

export const ALERTAS_DOCUMENTACION = [DOCUMENTACION_INVALIDA, DOCUMENTACION_CORRECTA, INICIO_ETAPA_DOCUMENTACION];


/************************************************ PAGOS ********************************************************************************************/

const NAME_INICIO_ETAPA_PAGOS = "INICIO_ETAPA_PAGOS";
export const INICIO_ETAPA_PAGOS = new Alert(NAME_INICIO_ETAPA_PAGOS, "Inicio la etapa para enviar pagos.", "", TipoAlert.AVISO);
ALERTAS.set(NAME_INICIO_ETAPA_PAGOS, INICIO_ETAPA_PAGOS);

const NAME_EVIDENCIA_INVALIDA = "EVIDENCIA_INVALIDA";
export const EVIDENCIA_INVALIDA = new Alert(NAME_EVIDENCIA_INVALIDA, "Evidencia de pago rechazada.", ListLinks.EVIDENCIA_PAGO.url, TipoAlert.ALERTA);
ALERTAS.set(NAME_EVIDENCIA_INVALIDA, EVIDENCIA_INVALIDA);

const NAME_EVIDENCIA_CORRECTA = "EVIDENCIA_CORRECTA";
export const EVIDENCIA_CORRECTA = new Alert(NAME_EVIDENCIA_CORRECTA, "Evidencia de pago aprobada.", ListLinks.EVIDENCIA_PAGO.url, TipoAlert.CONFIRMACION, true);
ALERTAS.set(NAME_EVIDENCIA_CORRECTA, EVIDENCIA_CORRECTA);

export const ALERTAS_PAGOS = [EVIDENCIA_INVALIDA, EVIDENCIA_CORRECTA, INICIO_ETAPA_PAGOS];


/************************************************ EVALUACION ********************************************************************************************/

const NAME_INICIO_ETAPA_EVALUACION = "INICIO_ETAPA_EVALUACION";
export const INICIO_ETAPA_EVALUACION = new Alert(NAME_INICIO_ETAPA_EVALUACION, "Inicio la etapa de evaluación.", "", TipoAlert.AVISO);
ALERTAS.set(NAME_INICIO_ETAPA_EVALUACION, INICIO_ETAPA_EVALUACION);

export const ALERTAS_EVALUACION = [INICIO_ETAPA_EVALUACION];
