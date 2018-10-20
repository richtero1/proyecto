export interface Roles {
    subscriber?: boolean;
    
    admin?: boolean;
}

export interface User {
    uid: string;
    email: string;
    displayName?: string;
    roles? : Roles;
}

