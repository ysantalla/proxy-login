import { User } from '@app/core/models/user.model';

export interface Token {
    user: User;
    iat?: number;
    exp?: number;
}
