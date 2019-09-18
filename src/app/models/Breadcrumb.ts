import { Link } from './Link';

export class Breadcrumb{
    links: Link[];
    visible: boolean;
    constructor( links: Link[], visible?: boolean | true ){
        this.links = links;
        this.visible = visible;
    }
}