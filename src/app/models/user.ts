export interface Roles {
    aspirante?: boolean;
    admin?: boolean;
    root?: boolean;
  }
  
  export interface UserInterface {
    id?: string;
    name?: string;
    email?: string;
    password?: string;
    photoUrl?: string;
    roles: Roles;
  }