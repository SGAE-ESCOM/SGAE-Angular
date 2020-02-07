import { Link } from './Link';

export class NavigationLink extends Link{
    icon: string;
    description: string;
    constructor(name:string, url: string, icon?: string | "", description?: string | ""){
        super(name, url);
        this.icon = icon;
        this.description = description;
    }
}