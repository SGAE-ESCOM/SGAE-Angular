import { LinkNavigation } from '@app/models/template/link-navigation';

export const links:LinkNavigation[] = [
    new LinkNavigation("Buttons theme","view-buttons", "format_paint", "Use different buttons bootstrap or angular theme"),
    new LinkNavigation("Drag and drop list","view-DND-list", "format_list_numbered", "Sort your list as you want"),
    new LinkNavigation("Forms and validation","view-form", "check_circle", "Validate form with different input")
    /*
    new Link("Registro",""),
    new Link("Convocatoria",""),
    new Link("Recepción de documentos",""),
    new Link("Pagos",""),
    new Link("Evaluación",""),
    new Link("Publicación de resultados",""),
    new Link("---------------------",""),
    new Link("Buttons","view-buttons"),
    */
];