import { NavigationLink } from '@models/template/NavigationLink';

export const linksAdmin:NavigationLink[] = [
    new NavigationLink("Inicio","/app/","home","Recepción de documentos necesarios para el registro"),
    new NavigationLink("Documentacion","/app/documentacion","folder_open","Recepción de documentos necesarios para el registro"),
    new NavigationLink("Evaluación","/app/evaluacion", "spellcheck", "Simulador de exámen y publicación de resultados"),
    new NavigationLink("Convocatoria","/app/convocatoria", "event", "Convocatoria para realizar el proceso de admisión"),
    new NavigationLink("Pagos","/app/pagos","credit_card","Generación de lineas de pagos"),
    new NavigationLink("Gestión Etapas","/app/etapas","dynamic_feed","Gestiona el orden y fecha de las etapas"),
    new NavigationLink("Gestión Usuarios","/app/usuarios","people_outline","Generación los usuarios y grupos de la aplicacion"),
];

export const linksMainPage:NavigationLink[] = [
    new NavigationLink("Inicio","","home", "Landingpage"),
    new NavigationLink("Login","/login","account_circle" ,"Inicio de sesión"),
];