import { Alert, TipoAlert } from "@models/utils/Alert";
import * as ListLinks from '@shared/routing-list/ListLinks';

export const ALERTAS = new Map();

//PAGOS

const NAME_EVIDENCIA_INVALIDA = "EVIDENCIA_INVALIDA";
export const EVIDENCIA_INVALIDA = new Alert(NAME_EVIDENCIA_INVALIDA, "Evidencia de pago rechazada.", ListLinks.EVIDENCIA_PAGO.url, TipoAlert.ALERTA);
ALERTAS.set(NAME_EVIDENCIA_INVALIDA, EVIDENCIA_INVALIDA);

const NAME_EVIDENCIA_CORRECTA = "EVIDENCIA_CORRECTA";
export const EVIDENCIA_CORRECTA = new Alert(NAME_EVIDENCIA_CORRECTA, "Evidencia de pago aprobada.", ListLinks.EVIDENCIA_PAGO.url, TipoAlert.CONFIRMACION, true);
ALERTAS.set(NAME_EVIDENCIA_CORRECTA, EVIDENCIA_CORRECTA);

export const ALERTAS_PAGOS = [EVIDENCIA_INVALIDA, EVIDENCIA_CORRECTA];

export function getAlertas(names: Array<string>): Array<Alert> {
    let alerts : Array<Alert> = new Array();
    names.forEach(name => alerts.push(ALERTAS.get(name)));
    return alerts;
}

export function removerGrupoAlertas(alertas: Array<string>, grupoAlertas: Alert[]){
    grupoAlertas.forEach(alerta => {
        let index = alertas.indexOf(alerta.nombre, 0);
        if (index > -1) alertas.splice(index, 1);
    });
    return alertas;
}

export function removerAlerta(alertas: Array<string>, alerta: Alert){
    let index = alertas.indexOf(alerta.nombre, 0);
    if (index > -1) alertas.splice(index, 1);
    return alertas;
}