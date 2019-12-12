import { NavigationLink } from '@models/template/NavigationLink';

export const links:NavigationLink[] = [
    new NavigationLink("Test","test","event_available", "CRUD y Archivos Dimámicos"),
    new NavigationLink("Registro","", "contact_mail", "Registro en la plataforma y creación de usuario"),
    new NavigationLink("Convocatoria","", "event", "Convocatoria para realizar el proceso de admisión"),
    new NavigationLink("Recepción de documentos","","folder_open","Documentos necesarios para el registro"),
    new NavigationLink("Pagos","","credit_card","Generación de lineas de pagos"),
    new NavigationLink("Evaluación","", "spellcheck", "Simulador de exámen"),
    new NavigationLink("Publicación de resultados","","event_available", "Fechas de publicacion de los resultados del simulador"),
];