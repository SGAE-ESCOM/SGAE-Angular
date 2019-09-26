import { Link } from './Link';

export class Breadcrumb{
    title: string;
    links: Link[];
    visible: boolean;
    constructor( title:string, links: Link[], visible?: boolean | true ){
        this.title = title;
        this.links = links;
        this.visible = visible;
    }
}