export class User {
    isAdmin: boolean;
    name: string;
    username: string;
    password?: string;
    quotaGroup: string;
}

export class LogRs {
    scrt: string;
    user: User;
}
