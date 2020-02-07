import { Link } from './Link';

export class Breadcrumb{
    title: Link = new Link();
    links: Link[];
    visible: boolean;
    constructor( title:Link, links?: Link[], visible?: boolean ){
        this.title = title;
        this.links = links || null;
        this.visible = visible || true;
    }
}