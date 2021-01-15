import { Link } from './Link';

export class NavigationLink extends Link{
    icon: string;
    description: string;
    disabled?: boolean;
    legar?: number;
    badege?: boolean;
    badgeLabel?: string;
    badgeColor?: string;
    constructor(name:string, url: string, icon?: string | "", description?: string | ""){
        super(name, url);
        this.icon = icon;
        this.description = description;
        this.disabled = false;
        this.badege = false;
        this.badgeLabel = '';
        this.badgeColor = '';
    }
}