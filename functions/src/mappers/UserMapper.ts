import { User } from '../types/contracts/User';

export class UserMapper {
    private static readonly FIELDS_TO_OVERWRITE = ['score'];

    static updateExistingUser(user: User, props: User): User {
        const updatedUser = { ...user };

        for (const [key, value] of Object.entries(props)) {
            const currentValue = updatedUser[key];

            if (!UserMapper.FIELDS_TO_OVERWRITE.includes(key) && UserMapper.isNumber(value) && UserMapper.isNumber(currentValue)) {
                updatedUser[key] = (currentValue as number) + (value as number);
            } else {
                updatedUser[key] = value;
            }
        }

        return updatedUser;
    }

    private static isNumber(value: unknown): boolean {
        return typeof value === 'number';
    }
}
