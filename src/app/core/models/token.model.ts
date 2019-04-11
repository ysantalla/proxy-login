import { User } from './user.model';

export interface Token {
    user: User;
    iat?: number;
    exp?: number;
}
