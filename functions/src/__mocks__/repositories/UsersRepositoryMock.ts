import { UsersRepository } from '../../repositories/UsersRepository';
import { User } from '../../types/contracts/User';
import { HttpStatusCode } from '../../types/HttpStatusCode';
import { ServiceResult } from '../../utils/ServiceResult';

export class UsersRepositoryMock implements UsersRepository {
    //
    private readonly inMemoryDB: Map<string, User> = new Map();

    getById(id: string): Promise<ServiceResult<User>> {
        const user = this.inMemoryDB.get(id);

        if (!user) {
            return Promise.resolve(ServiceResult.failed(HttpStatusCode.NOT_FOUND));
        }

        return Promise.resolve(ServiceResult.succeeded(user));
    }

    create(id: string, user: User): Promise<ServiceResult<User>> {
        this.inMemoryDB.set(id, user);

        return Promise.resolve(ServiceResult.succeeded(user));
    }
}
