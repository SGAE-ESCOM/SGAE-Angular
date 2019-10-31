import { NavigationLink } from './NavigationLink';

export class Breadcrumb{
    title: string;
    links: NavigationLink[];
    visible: boolean;
    constructor( title:string, links?: NavigationLink[], visible?: boolean ){
        this.title = title;
        this.links = links || null;
        this.visible = visible || true;
    }
}