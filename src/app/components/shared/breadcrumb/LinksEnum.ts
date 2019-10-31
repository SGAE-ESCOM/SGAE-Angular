import { Link } from '@app/models/template/Link';

export abstract class LinksEnum {
    static readonly HOME = new Link("Home","home");
    static readonly BUTTONS = new Link("Buttons theme","view-buttons");
    static readonly DRAG_AND_DROP = new Link("Drag and drop list","view-DND-list");
}