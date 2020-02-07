export class User {
    name: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    password: string;
    constructor(name?: string, lastName?: string, email?: string,
        phoneNumber?: string, password?: string) {
        this.name = name || '';
        this.lastName = lastName || '';
        this.email = email || '';
        this.phoneNumber = phoneNumber || '';
        this.password = password || '';
    }
}