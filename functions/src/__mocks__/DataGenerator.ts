import * as casual from 'casual';

export interface UserMock {
    id: string;
    name: string;
    score: number;
    coins: number;
    [key: string]: string | number;
}

export class DataGenerator {
    static generateUsersList(length = 10): Array<unknown> {
        const users: Array<unknown> = [];

        for (let i = 0; i < length; i++) {
            users.push(DataGenerator.generateUser());
        }

        return users;
    }

    static generateUser(props?: Partial<UserMock>): UserMock {
        return {
            id: casual._uuid(),
            name: casual._first_name(),
            score: casual.integer(0, 100),
            coins: casual.integer(-20, 20),
            ...props,
        };
    }
}
