import { LinkNavigation } from './link-navigation';

export class Breadcrumb{
    title: string;
    links: LinkNavigation[];
    visible: boolean;
    constructor( title:string, links: LinkNavigation[], visible?: boolean | true ){
        this.title = title;
        this.links = links;
        this.visible = visible;
    }
}