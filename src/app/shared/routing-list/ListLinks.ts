import { Breadcrumb } from '@models/template/Breadcrumb';
import { NavigationLink } from '@models/template/NavigationLink';

//RUTAS DE PAGINA
const LANDINPAGE = new NavigationLink("Inicio", "", "home", "Landingpage");
const LOGIN = new NavigationLink("Login", "/login", "account_circle", "Inicio de sesión");

//HOME
const HOME = new NavigationLink("Inicio", "/app/", "home");
export const BC_HOME = new Breadcrumb(HOME);

/**
 * Lins para administradores
 */
//DOCUMENTACION
const DOCUMENTACION = new NavigationLink("Documentación", "/app/documentacion", "folder_open", "Recepción de documentos necesarios para el registro");
const ADMINISTRAR_DOCUMENTACION = new NavigationLink("Administrar Requisitos", "/app/documentacion/administrar", "folder_shared", "Agrega, edita o elimina los documentos necesarios para el registro");
const ORDENAR_REQUISITOS = new NavigationLink("Ordenar Requisitos", "/app/documentacion/administrar/ordenar-requisitos");
const VALIDAR_DOCUMENTACION = new NavigationLink("Validar", "/app/documentacion/validar", "check_box", "Valida la información de los aspirantes que ya han llenado su información");
const VALIDAR_DOC_ASPIRANTE = new NavigationLink("Validar Documentación Aspirante", "/app/documentacion/validar", "check_box");
const SUBIR_DOCUMENTACION = new NavigationLink("Subir Documentación", "/app/documentacion/subir", "cloud_upload", "Llena información de los requisitos.");

export const BC_DOCUMENTACION = new Breadcrumb(DOCUMENTACION, [HOME]);
export const BC_ADMINISTRAR_DOCUMENTACION = new Breadcrumb(ADMINISTRAR_DOCUMENTACION, [HOME, DOCUMENTACION]);
export const BC_ORDENAR_REQUISITOS = new Breadcrumb(ORDENAR_REQUISITOS, [HOME, DOCUMENTACION, ADMINISTRAR_DOCUMENTACION]);
export const BC_VALIDAR_DOCUMENTACION = new Breadcrumb(VALIDAR_DOCUMENTACION, [HOME, DOCUMENTACION]);
export const BC_VALIDAR_DOC_ASPIRANTE = new Breadcrumb(VALIDAR_DOC_ASPIRANTE, [HOME, DOCUMENTACION,VALIDAR_DOCUMENTACION]);
export const BC_SUBIR_DOCUMENTACION = new Breadcrumb(SUBIR_DOCUMENTACION, [HOME, DOCUMENTACION]);

//EVALUACION
const EVALUACION = new NavigationLink("Evaluación", "/app/evaluacion", "spellcheck", "Simulador de exámen y publicación de resultados");
export const BC_EVALUACION = new Breadcrumb(EVALUACION, [HOME]);

//CONVOCATORIA
const CONVOCATORIA = new NavigationLink("Convocatoria", "/app/convocatoria", "event", "Convocatoria para realizar el proceso de admisión");
export const BC_CONVOCATORIA = new Breadcrumb(CONVOCATORIA, [HOME]);

//PAGOS
const PAGOS = new NavigationLink("Pagos", "/app/pagos", "credit_card", "Generación de lineas de pagos");
export const BC_PAGOS = new Breadcrumb(PAGOS, [HOME]);

//ETAPAS
const ETAPAS = new NavigationLink("Gestión Etapas", "/app/etapas", "dynamic_feed", "Gestiona el orden y fecha de las etapas");
const DEFINIR_ETAPAS = new NavigationLink("Definir Etapas", "/app/etapas/definir-etapas", "dynamic_feed", "Gestiona el orden y las etapas a usar");
const DEFINIR_FECHAS = new NavigationLink("Definir Fechas", "/app/etapas/definir-fechas", "event_note", "Gestiona el orden y las etapas a usar");

export const BC_ETAPAS = new Breadcrumb(ETAPAS, [HOME]);
export const BC_DEFINIR_ETAPAS = new Breadcrumb(DEFINIR_ETAPAS,[HOME, ETAPAS]);
export const BC_DEFINIR_FECHAS = new Breadcrumb(DEFINIR_FECHAS,[HOME, ETAPAS]);

//USUARIOS
const USUARIOS = new NavigationLink("Gestión Usuarios", "/app/usuarios", "people_outline", "Generación los usuarios y grupos de la aplicacion");
const GESTION_ADMON = new NavigationLink("Gestión Administradores", "/app/usuarios/gestion-admon", "people_outline", "Gestión de los administradores de la institución");
const GESTION_ASPIRANTES = new NavigationLink("Gestión Aspirantes", "/app/usuarios/gestion-aspirantes", "people_outline", "Gestión de los aspirantes registrados");
const REGISTRAR_ADMON = new NavigationLink("Registrar Nuevo Administrador", "/app/usuarios/gestion-admon/registrar", "check_box", "Formulario para registrar nuevos administradores");
const EDITAR_ADMON = new NavigationLink("Editar Administrador", "/app/usuarios/gestion-admon/editar", "check_box", "Formulario para editar información de un administrador");

export const BC_USUARIOS = new Breadcrumb(USUARIOS, [HOME]);
export const BC_GESTION_ADMON = new Breadcrumb(GESTION_ADMON, [HOME, USUARIOS]);
export const BC_GESTION_ASPIRANTES = new Breadcrumb(GESTION_ASPIRANTES, [HOME, USUARIOS]);
export const BC_REGISTRAR_ADMON = new Breadcrumb(REGISTRAR_ADMON, [HOME, USUARIOS, GESTION_ADMON]);
export const BC_EDITAR_ADMON = new Breadcrumb(EDITAR_ADMON, [HOME, USUARIOS, GESTION_ADMON]);
/**
 * Links para los aspirantes
 */
export const LINKS_PAGE: NavigationLink[] = [LANDINPAGE, LOGIN];

export const LINKS_HOME = {
    page: [LANDINPAGE, LOGIN],
    aspirante: [HOME, DOCUMENTACION, EVALUACION, PAGOS],
    admin: [HOME, DOCUMENTACION, EVALUACION, PAGOS, ETAPAS, USUARIOS],
    root: [HOME, DOCUMENTACION, EVALUACION, PAGOS, ETAPAS, USUARIOS]
}

export const LINKS_DOCUMENTACION = {
    aspirante: [SUBIR_DOCUMENTACION],
    admin: [VALIDAR_DOCUMENTACION, ADMINISTRAR_DOCUMENTACION],
    root: [VALIDAR_DOCUMENTACION, ADMINISTRAR_DOCUMENTACION]
}

export const LINKS_ETAPAS = [DEFINIR_ETAPAS ,DEFINIR_FECHAS];

export const LINKS_USUARIOS = [GESTION_ADMON, GESTION_ASPIRANTES];