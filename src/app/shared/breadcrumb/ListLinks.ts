import { Link } from '@models/template/Link';
import { Breadcrumb } from '@models/template/Breadcrumb';

//CREACION DE LAS RUTAS
const HOME = new Link("Inicio", "/app/");
const DOCUMENTACION = new Link("Documentación", "/app/documentacion");
const EVALUACION = new Link("Evaluación", "/app/evaluacion");
const CONVOCATORIA = new Link("Convocatoria", "/app/convocatoria");
const PAGOS = new Link("Pagos", "/app/pagos");
const ETAPAS = new Link("Gestión Etapas", "/app/etapas");
const USUARIOS = new Link("Gestión Usuarios", "/app/usuarios");

const BUTTONS = new Link("Buttons theme", "view-buttons");
const DRAG_AND_DROP = new Link("Drag and drop list", "view-DND-list");
const FORMS_AND_VALIDATION = new Link("Forms and validation", "view-form");
const DYNAMIC_FORM = new Link("Dynamic form", "dynamic-form");
const MESSAGES = new Link("Messages", "view-messages");
const CUSTOM_THEME = new Link("Custom Theme", "view-custom-theme");

//Nomenclatura de breadcrums BC_Name_Component
export const BC_HOME = new Breadcrumb(HOME);
export const BC_DOCUMENTACION = new Breadcrumb( DOCUMENTACION, [HOME]);
export const BC_EVALUACION = new Breadcrumb( EVALUACION, [HOME]);
export const BC_CONVOCATORIA = new Breadcrumb( CONVOCATORIA, [HOME]);
export const BC_PAGOS = new Breadcrumb( PAGOS, [HOME]);
export const BC_ETAPAS = new Breadcrumb( ETAPAS, [HOME]);
export const BC_USUARIOS = new Breadcrumb( USUARIOS, [HOME]);

export const BD_BUTTONS = new Breadcrumb(BUTTONS, [HOME]);
export const BD_DRAG_AND_DROP = new Breadcrumb(DRAG_AND_DROP, [HOME]);
export const BD_FORMS_AND_VALIDATION = new Breadcrumb(FORMS_AND_VALIDATION, [HOME]);
export const BD_DYNAMIC_FORM = new Breadcrumb(DYNAMIC_FORM, [HOME]);
export const BD_MESSAGES = new Breadcrumb(MESSAGES, [HOME]);
export const BD_CUSTOM_THEME = new Breadcrumb(CUSTOM_THEME, [HOME]);
