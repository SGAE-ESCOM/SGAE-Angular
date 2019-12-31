import { Breadcrumb } from '@models/template/Breadcrumb';
import { NavigationLink } from '@models/template/NavigationLink';

//RUTAS DE PAGINA
const LANDINPAGE = new NavigationLink("Inicio", "", "home", "Landingpage");
const LOGIN = new NavigationLink("Login", "/login", "account_circle", "Inicio de sesión");

//HOME
const HOME = new NavigationLink("Inicio", "/app/", "home", "Recepción de documentos necesarios para el registro");
export const BC_HOME = new Breadcrumb(HOME);

//DOCUMENTACION
const DOCUMENTACION = new NavigationLink("Documentación", "/app/documentacion", "folder_open", "Recepción de documentos necesarios para el registro");
const ADMINISTRAR_DOCUMENTACION = new NavigationLink("Administrar", "/app/documentacion/administrar", "folder_shared", "Agrega, edita o elimina los documentos necesarios para el registro");
const VALIDAR_DOCUMENTACION = new NavigationLink("Validar", "/app/documentacion/validar", "folder_shared", "Valida la información de los aspirantes que ya han llenado su información");
export const BC_DOCUMENTACION = new Breadcrumb(DOCUMENTACION, [HOME]);
export const BC_ADMINISTRAR_DOCUMENTACION = new Breadcrumb(ADMINISTRAR_DOCUMENTACION, [HOME, DOCUMENTACION]);
export const BC_VALIDAR_DOCUMENTACION = new Breadcrumb(VALIDAR_DOCUMENTACION, [HOME, DOCUMENTACION]);

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
export const BC_ETAPAS = new Breadcrumb(ETAPAS, [HOME]);

//USUARIOS
const USUARIOS = new NavigationLink("Gestión Usuarios", "/app/usuarios", "people_outline", "Generación los usuarios y grupos de la aplicacion");
export const BC_USUARIOS = new Breadcrumb(USUARIOS, [HOME]);

//Nomenclatura de breadcrums BC_Name_Component
export const linksAdmin: NavigationLink[] = [HOME, DOCUMENTACION, EVALUACION, CONVOCATORIA, PAGOS, ETAPAS, USUARIOS];
export const linksPage: NavigationLink[] = [LANDINPAGE, LOGIN];
export const linksDocumentacionAdmin: NavigationLink[] = [ADMINISTRAR_DOCUMENTACION, VALIDAR_DOCUMENTACION];
export const linksDocumentacionAspirante: NavigationLink[] = [VALIDAR_DOCUMENTACION, ADMINISTRAR_DOCUMENTACION];
