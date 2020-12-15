import { Alert, TipoAlert } from "@models/utils/Alert";
import * as ListLinks from '@shared/routing-list/ListLinks';

export const ALERTAS = new Map();

const NAME_EVIDENCIA_INVALIDA = "EVIDENCIA_INVALIDA";
export const EVIDENCIA_INVALIDA = new Alert(NAME_EVIDENCIA_INVALIDA, "Tu evidencia de pago ha sido rechazada.", ListLinks.EVIDENCIA_PAGO.url, TipoAlert.ALERTA);
ALERTAS.set(NAME_EVIDENCIA_INVALIDA, EVIDENCIA_INVALIDA);

const NAME_EVIDENCIA_CORRECTA = "EVIDENCIA_CORRECTA";
export const EVIDENCIA_CORRECTA = new Alert(NAME_EVIDENCIA_CORRECTA, "Tu evidencia de pago ha sido aprobada.", ListLinks.EVIDENCIA_PAGO.url, TipoAlert.CONFIRMACION);
ALERTAS.set(NAME_EVIDENCIA_CORRECTA, EVIDENCIA_CORRECTA);

export function getAlertas(names: Array<string>): Array<Alert> {
    let alerts : Array<Alert> = new Array();
    names.forEach(name => alerts.push(ALERTAS.get(name)));
    return alerts;
}