import { User } from './user';

export interface Account {
    owner: User;
    currency: string;
    balance: number;
}
