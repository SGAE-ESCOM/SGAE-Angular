import { Alert, TipoAlert } from "@models/utils/Alert";
import * as ListLinks from '@shared/routing-list/ListLinks';

export const ALERTAS = new Map();

const NAME_EVIDENCIA_INVALIDA = "EVIDENCIA_INVALIDA";
const EVIDENCIA_INVALIDA = new Alert(NAME_EVIDENCIA_INVALIDA, "Tu evidencia de pago ha sido rechazada", ListLinks.EVIDENCIA_PAGO, TipoAlert.ALERTA);
ALERTAS.set(NAME_EVIDENCIA_INVALIDA, EVIDENCIA_INVALIDA);
// export const ALERTAS = {
//     NAME_EVIDENCIA_INVALIDA : EVIDENCIA_INVALIDA
// }