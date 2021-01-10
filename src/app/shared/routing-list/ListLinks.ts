import { Breadcrumb } from '@models/template/Breadcrumb';
import { NavigationLink } from '@models/template/NavigationLink';

//RUTAS DE PAGINA
const LANDINPAGE = new NavigationLink("Inicio", "", "home", "Landingpage");
const LOGIN = new NavigationLink("Login", "/login", "account_circle", "Inicio de sesión");

//HOME
export const HOME = new NavigationLink("Inicio", "/app/", "home");
export const BC_HOME = new Breadcrumb(HOME);

/************************************************ //DOCUMENTACION ********************************************************************************************/
export const DOCUMENTACION = new NavigationLink("Documentación", "/app/documentacion", "folder_open", "Recepción de documentos necesarios para el registro");
const ADMINISTRAR_DOCUMENTACION = new NavigationLink("Administrar Requisitos", "/app/documentacion/administrar", "folder_shared", "Agrega, edita o elimina los documentos necesarios para el registro");
const ORDENAR_REQUISITOS = new NavigationLink("Ordenar Requisitos", "/app/documentacion/administrar/ordenar-requisitos");
const VALIDAR_DOCUMENTACION = new NavigationLink("Validar", "/app/documentacion/validar", "check_box", "Valida la información de los aspirantes que ya han llenado su información");
const VALIDAR_DOC_ASPIRANTE = new NavigationLink("Validar Documentación Aspirante", "/app/documentacion/validar", "check_box");
const SUBIR_DOCUMENTACION = new NavigationLink("Subir Documentación", "/app/documentacion/subir", "cloud_upload", "Llena información de los requisitos.");

export const BC_DOCUMENTACION = new Breadcrumb(DOCUMENTACION, [HOME]);
export const BC_ADMINISTRAR_DOCUMENTACION = new Breadcrumb(ADMINISTRAR_DOCUMENTACION, [HOME, DOCUMENTACION]);
export const BC_ORDENAR_REQUISITOS = new Breadcrumb(ORDENAR_REQUISITOS, [HOME, DOCUMENTACION, ADMINISTRAR_DOCUMENTACION]);
export const BC_VALIDAR_DOCUMENTACION = new Breadcrumb(VALIDAR_DOCUMENTACION, [HOME, DOCUMENTACION]);
export const BC_VALIDAR_DOC_ASPIRANTE = new Breadcrumb(VALIDAR_DOC_ASPIRANTE, [HOME, DOCUMENTACION, VALIDAR_DOCUMENTACION]);
export const BC_SUBIR_DOCUMENTACION = new Breadcrumb(SUBIR_DOCUMENTACION, [HOME, DOCUMENTACION]);

export const LINKS_DOCUMENTACION = {
    aspirante: [SUBIR_DOCUMENTACION],
    admin: [VALIDAR_DOCUMENTACION, ADMINISTRAR_DOCUMENTACION],
    root: [VALIDAR_DOCUMENTACION, ADMINISTRAR_DOCUMENTACION]
}

/************************************************ EVALUACION ********************************************************************************************/
export const EVALUACION = new NavigationLink("Evaluación", "/app/evaluacion", "spellcheck", "Simulador de exámen y publicación de resultados");
export const BC_EVALUACION = new Breadcrumb(EVALUACION, [HOME]);
//ADMIN
export const GESTIONAR_GRUPOS = new NavigationLink("Gestionar Grupos", "/app/evaluacion/gestionar-grupos", "group", "Gestiona los grupos para aplicar evaluacion(es)");
export const BC_GESTIONAR_GRUPOS = new Breadcrumb(GESTIONAR_GRUPOS, [HOME, EVALUACION]);
export const GESTIONAR_EVALUACION = new NavigationLink("Gestionar Evaluación", "/app/evaluacion/gestionar-evaluacion", "spellcheck", "Gestiona la evaluación para aplicar a los aspirantes");
export const BC_GESTIONAR_EVALUACION = new Breadcrumb(GESTIONAR_EVALUACION, [HOME, EVALUACION]);
export const PREGUNTAS = new NavigationLink("Preguntas", "/app/evaluacion/gestionar-evaluacion/preguntas", "format_list_bulleted", "Gestiona preguntas relacionadas a un tema");
export const BC_PREGUNTAS = new Breadcrumb(PREGUNTAS, [HOME, EVALUACION, GESTIONAR_EVALUACION])
export const INFO_KATEX = new NavigationLink("Información, ¿Cómo agregar símbolos?", "/app/evaluacion/gestionar-evaluacion/preguntas/info", "help", "");
export const BC_INFO_KATEX = new Breadcrumb(INFO_KATEX, [HOME, EVALUACION, GESTIONAR_EVALUACION, PREGUNTAS])
export const ADMIN_EVALUACION = new NavigationLink("Evaluación", "/app/evaluacion/gestionar-evaluacion/evaluacion", "description", "Relaciona las preguntas con una evaluación");
export const BC_ADMIN_EVALUACION = new Breadcrumb(ADMIN_EVALUACION, [HOME, EVALUACION, GESTIONAR_EVALUACION])
export const APROBACION_EVALUACION = new NavigationLink("Aprobación", "/app/evaluacion/aprobacion", "description", "Con base al resultado de las aplicaciones asigna el estado de cada aspirante");
export const BC_APROBACION_EVALUACION = new Breadcrumb(APROBACION_EVALUACION, [HOME, EVALUACION])

export const LINKS_GESTIONAR_EVALUACIONES = {
    aspirante: [],
    admin: [PREGUNTAS, ADMIN_EVALUACION],
    root: [PREGUNTAS, ADMIN_EVALUACION]
}

//ASPIRANTE
export const GRUPOS = new NavigationLink("Grupos", "/app/evaluacion/grupos", "group", "Grupos para aplicar evaluacion(es)");
export const BC_GRUPOS = new Breadcrumb(GRUPOS, [HOME, EVALUACION]);
export const EVALUACIONES = new NavigationLink("Evaluaciones", "/app/evaluacion/evaluaciones", "spellcheck", "Evaluacion de conocimientos");
export const BC_EVALUACIONES = new Breadcrumb(EVALUACIONES, [HOME, EVALUACION]);
export const RESULTADOS = new NavigationLink("Publicación de Resultados", "/app/evaluacion/resultados", "event", "Resultado de evaluacion");
export const BC_RESULTADOS = new Breadcrumb(RESULTADOS, [HOME, EVALUACION]);
export const ADMIN_APLICACION = new NavigationLink("Aplicación", "/app/evaluacion/aplicacion", "event", "Define los parametros de tu evaluación y el grupo al que aplicacrá");
export const BC_ADMIN_APLICACION = new Breadcrumb(ADMIN_APLICACION, [HOME, EVALUACION])

export const LINKS_EVALUACION = {
    aspirante: [GRUPOS, EVALUACIONES, RESULTADOS],
    admin: [GESTIONAR_GRUPOS, GESTIONAR_EVALUACION, ADMIN_APLICACION, APROBACION_EVALUACION],
    root: [GESTIONAR_GRUPOS, GESTIONAR_EVALUACION, ADMIN_APLICACION, APROBACION_EVALUACION]
}

/************************************************ CONVOCATORIA ********************************************************************************************/
export const CONVOCATORIA = new NavigationLink("Convocatoria", "/app/convocatoria", "event", "Convocatoria para realizar el proceso de admisión");
export const BC_CONVOCATORIA = new Breadcrumb(CONVOCATORIA, [HOME]);

/************************************************ PAGOS ********************************************************************************************/
export const PAGOS = new NavigationLink("Pagos", "/app/pagos", "credit_card", "Generación de lineas de pagos");
export const BC_PAGOS = new Breadcrumb(PAGOS, [HOME]);
//ADMIN
export const CONFIGURAR_REFERENCIAS = new NavigationLink("Configurar Referencias", "/app/pagos/configurar-referencias", "receipt", "Edita las referencias para los formatos de pago");
export const BC_CONFIGURAR_REFERENCIAS = new Breadcrumb(CONFIGURAR_REFERENCIAS, [HOME, PAGOS]);

export const GESTIONAR_CUENTAS = new NavigationLink("Gestionar Cuentas", "/app/pagos/gestionar-cuentas", "account_balance", "Gestiona las cuentas bancarias para recibir pagos");
export const BC_GESTIONAR_CUENTAS = new Breadcrumb(GESTIONAR_CUENTAS, [HOME, PAGOS]);

export const VALIDAR_PAGOS = new NavigationLink("Validar Pagos", "/app/pagos/validar-pagos", "fact_check", "Valida los pagos de los aspirantes que ya han enviado el formato de pago");
export const BC_VALIDAR_PAGOS = new Breadcrumb(VALIDAR_PAGOS, [HOME, PAGOS]);

export const VALIDAR_PAGO_ASPIRANTE = new NavigationLink("Validar Pago Aspirante", "/app/pagos/validar-pagos");
export const BC_VALIDAR_PAGO_ASPIRANTE = new Breadcrumb(VALIDAR_PAGO_ASPIRANTE, [HOME, PAGOS, VALIDAR_PAGOS]);


export const REVISAR_CUENTA = new NavigationLink("Revisar Cuenta", "/app/pagos/revisar-cuenta");
export const BC_REVISAR_CUENTA = new Breadcrumb(REVISAR_CUENTA, [HOME, PAGOS, GESTIONAR_CUENTAS]);

//ASPIRANTE
export const EVIDENCIA_PAGO = new NavigationLink("Subir evidencia de Pago", "/app/pagos/evidenciar-pago", "receipt", "Sube tu evidencia de pago y revisa su estado de aprobación.");
export const BC_EVIDENCIA_PAGO = new Breadcrumb(EVIDENCIA_PAGO, [HOME, PAGOS]);

export const FORMATO_PAGO = new NavigationLink("Visualizar formato de Pago", "/app/pagos/formato-pago", "description", "Consulta el formato de pago para continuar con el proceso de admisión");
export const BC_FORMATO_PAGO = new Breadcrumb(FORMATO_PAGO, [HOME, PAGOS]);


export const LINKS_PAGOS = {
    aspirante: [FORMATO_PAGO, EVIDENCIA_PAGO],
    // admin: [GESTIONAR_CUENTAS, CONFIGURAR_REFERENCIAS, VALIDAR_PAGOS],
    admin: [GESTIONAR_CUENTAS, VALIDAR_PAGOS],
    root: [GESTIONAR_CUENTAS, CONFIGURAR_REFERENCIAS, VALIDAR_PAGOS]
}

/************************************************ ETAPAS ********************************************************************************************/
export const ETAPAS = new NavigationLink("Gestión Etapas", "/app/etapas", "dynamic_feed", "Gestiona el orden y fecha de las etapas");
const DEFINIR_ETAPAS = new NavigationLink("Definir Etapas", "/app/etapas/definir-etapas", "dynamic_feed", "Gestiona el orden y las etapas a usar");
const DEFINIR_FECHAS = new NavigationLink("Definir Fechas", "/app/etapas/definir-fechas", "event_note", "Gestiona el orden y las etapas a usar");

export const BC_ETAPAS = new Breadcrumb(ETAPAS, [HOME]);
export const BC_DEFINIR_ETAPAS = new Breadcrumb(DEFINIR_ETAPAS, [HOME, ETAPAS]);
export const BC_DEFINIR_FECHAS = new Breadcrumb(DEFINIR_FECHAS, [HOME, ETAPAS]);

/************************************************ USUARIOS ********************************************************************************************/
export const USUARIOS = new NavigationLink("Gestión Usuarios", "/app/usuarios", "people_outline", "Generación los usuarios y grupos de la aplicacion");
const GESTION_ADMON = new NavigationLink("Gestión Administradores", "/app/usuarios/gestion-admon", "people_outline", "Gestión de los administradores de la institución");
const GESTION_ASPIRANTES = new NavigationLink("Gestión Aspirantes", "/app/usuarios/gestion-aspirantes", "people_outline", "Gestión de los aspirantes registrados");
const REGISTRAR_ADMON = new NavigationLink("Registrar Nuevo Administrador", "/app/usuarios/gestion-admon/registrar", "check_box", "Formulario para registrar nuevos administradores");
const EDITAR_ADMON = new NavigationLink("Editar Administrador", "/app/usuarios/gestion-admon/editar", "check_box", "Formulario para editar información de un administrador");
const REVISAR_ASPIRANTES = new NavigationLink("Revisar Aspirantes", "/app/usuarios/gestion-aspirantes/revisar-aspirantes", "people_outline", "Revisa la informacion de los aspirantes registrados.")
const ASIGNAR_ASPIRANTES = new NavigationLink("Asignar Aspirantes", "/app/usuarios/gestion-aspirantes/asignar-aspirantes", "check_box", "Asigna los aspirantes que hayan completado todas las etapas del sistema.")

export const BC_USUARIOS = new Breadcrumb(USUARIOS, [HOME]);
export const BC_GESTION_ADMON = new Breadcrumb(GESTION_ADMON, [HOME, USUARIOS]);
export const BC_GESTION_ASPIRANTES = new Breadcrumb(GESTION_ASPIRANTES, [HOME, USUARIOS]);
export const BC_REGISTRAR_ADMON = new Breadcrumb(REGISTRAR_ADMON, [HOME, USUARIOS, GESTION_ADMON]);
export const BC_EDITAR_ADMON = new Breadcrumb(EDITAR_ADMON, [HOME, USUARIOS, GESTION_ADMON]);
export const BC_REVISAR_ASPIRANTES = new Breadcrumb(REVISAR_ASPIRANTES, [HOME, USUARIOS, GESTION_ASPIRANTES]);
export const BC_ASIGNAR_ASPIRANTES = new Breadcrumb(ASIGNAR_ASPIRANTES, [HOME, USUARIOS, GESTION_ASPIRANTES]);

export const LINKS_GESTION_ASPIRANTES = [REVISAR_ASPIRANTES, ASIGNAR_ASPIRANTES];

/************************************************ USUARIO ********************************************************************************************/
export const CONFIGURAR_USUARIO = new NavigationLink("Configurar Usuario", "/app/usuario/configurar-usuario");

export const BC_CONFIGURAR_USUARIO = new Breadcrumb(CONFIGURAR_USUARIO, [HOME]);

/************************************************ HOME AND LANDINGPAGE ********************************************************************************************/
export const LINKS_PAGE: NavigationLink[] = [LANDINPAGE, LOGIN];

export const LINKS_HOME = {
    page: [LANDINPAGE, LOGIN],
    aspirante: [HOME, DOCUMENTACION, EVALUACION, PAGOS],
    admin: [HOME, DOCUMENTACION, EVALUACION, PAGOS, ETAPAS, USUARIOS],
    root: [HOME, DOCUMENTACION, EVALUACION, PAGOS, ETAPAS, USUARIOS]
}

export const LINKS_ETAPAS = [DEFINIR_ETAPAS, DEFINIR_FECHAS];
export const LINKS_USUARIOS = [GESTION_ADMON, GESTION_ASPIRANTES];
export const LINKS_ROOT_USUARIOS = [GESTION_ADMON, GESTION_ASPIRANTES];

/************************************************ HOME AND LANDINGPAGE ********************************************************************************************/
export function getCardsByEtapas(rol: string, etapas: any) {
    let links = [];
    if(etapas){
        links = Object.entries(etapasJson).reduce((prev, [key, value]) => {
            if (etapas[key])
                prev = prev.concat(value);
            return prev;
        }, []);
    }
    if(rol === 'admin' || rol === 'root')
        links = links.concat(ETAPAS, USUARIOS);
    links.unshift(HOME);
    return links;
}

const etapasJson = {
    'documentacion': DOCUMENTACION,
    'evaluacionConocimientos': EVALUACION,
    'pago': PAGOS
}