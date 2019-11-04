import { Link } from '@app/models/template/Link';

export abstract class ListLinks {
    static readonly HOME = new Link("Home","home");
    static readonly BUTTONS = new Link("Buttons theme","view-buttons");
    static readonly DRAG_AND_DROP = new Link("Drag and drop list","view-DND-list");
    static readonly FORMS_AND_VALIDATION = new Link("Forms and validation","view-form");
    static readonly DYNAMIC_FORM = new Link("Dynamic form","dynamic-form");
}