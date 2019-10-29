import { LinkNavigation } from './link-navigation';

export class Breadcrumb{
    title: string;
    links: LinkNavigation[];
    visible: boolean;
    constructor( title:string, links?: LinkNavigation[], visible?: boolean ){
        this.title = title;
        this.links = links || null;
        this.visible = visible || true;
    }
}