import { NavigationLink } from '@models/template/NavigationLink';

export const links:NavigationLink[] = [
    new NavigationLink("Custom theme","view-custom-theme", "format_paint", "Override the default theme and choose your palette colors"),
    new NavigationLink("Usage","view-custom-theme", "format_paint", "How to generate modules and components in this template, structure and more"),
    new NavigationLink("Buttons theme","view-buttons", "radio_button_checked", "Use different buttons bootstrap or angular theme"),
    new NavigationLink("Drag and drop list","view-DND-list", "format_list_numbered", "Sort your list as you want"),
    new NavigationLink("Forms and validation","view-form", "check_circle", "Validate form with different input"),
    new NavigationLink("Dynamic form","dynamic-form", "dynamic_feed", "Create a form with your own form elements and parametters"),
    new NavigationLink("Messages","view-messages", "message", "Alerts, Messages and tooltip")
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