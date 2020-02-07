export class Message {
    title: string;
    content: string;
    style: string;
    icon: string;

    constructor(content: string, title?: string, style?: string, icon?: string) {
        this.title = title || '';
        this.content = content;
        this.style = style || 'primary';
        this.icon = icon || 'none';
    }
}