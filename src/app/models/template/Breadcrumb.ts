import { Link } from './Link';

export class Breadcrumb{
    title: string;
    links: Link[];
    visible: boolean;
    constructor( title:string, links?: Link[], visible?: boolean ){
        this.title = title;
        this.links = links || null;
        this.visible = visible || true;
    }
}