import { Link } from '@models/template/Link';
import { Breadcrumb } from '@models/template/Breadcrumb';

//CREACION DE LAS RUTAS
const HOME = new Link("Inicio", "/app/");
const TEST = new Link("Test", "test");
const BUTTONS = new Link("Buttons theme", "view-buttons");
const DRAG_AND_DROP = new Link("Drag and drop list", "view-DND-list");
const FORMS_AND_VALIDATION = new Link("Forms and validation", "view-form");
const DYNAMIC_FORM = new Link("Dynamic form", "dynamic-form");
const MESSAGES = new Link("Messages", "view-messages");
const CUSTOM_THEME = new Link("Custom Theme", "view-custom-theme");

//Nomenclatura de breadcrums BC_Name_Component
export const BC_HOME = new Breadcrumb(HOME);
export const BC_TEST = new Breadcrumb(TEST,[HOME]);

export const BD_BUTTONS = new Breadcrumb(BUTTONS, [HOME]);
export const BD_DRAG_AND_DROP = new Breadcrumb(DRAG_AND_DROP, [HOME]);
export const BD_FORMS_AND_VALIDATION = new Breadcrumb(FORMS_AND_VALIDATION, [HOME]);
export const BD_DYNAMIC_FORM = new Breadcrumb(DYNAMIC_FORM, [HOME]);
export const BD_MESSAGES = new Breadcrumb(MESSAGES, [HOME]);
export const BD_CUSTOM_THEME = new Breadcrumb(CUSTOM_THEME, [HOME]);
