import { UserMapper } from '../mappers/UserMapper';
import { UsersRepository } from '../repositories/UsersRepository';
import { User } from '../types/contracts/User';
import { HttpStatusCode } from '../types/HttpStatusCode';
import { Logger } from '../utils/Logger';
import { ServiceResult } from '../utils/ServiceResult';

export interface UsersService {
    getUserById(id: string): Promise<ServiceResult<User>>;
    updateUser(user: User): Promise<ServiceResult<User>>;
}

export class UsersServiceImpl implements UsersService {
    //
    constructor(private readonly repository: UsersRepository) {}

    async getUserById(id: string): Promise<ServiceResult<User>> {
        Logger.info(`UsersServiceImpl::getUserById::Id`, { id });

        return this.repository.getById(id);
    }

    async updateUser(user: User): Promise<ServiceResult<User>> {
        Logger.info(`UsersServiceImpl::updateUser::user`, user);

        const getUserResult = await this.getUserById(user.id);

        if (getUserResult.code === HttpStatusCode.NOT_FOUND) {
            return await this.repository.create(user.id, user);
        }

        const existingUser = getUserResult.content as User;

        Logger.info(`UsersServiceImpl::getUserById::existingUser`, existingUser);

        const updatedUser = UserMapper.updateExistingUser(existingUser, user);

        Logger.info(`UsersServiceImpl::getUserById::updatedUser`, updatedUser);

        return this.repository.create(user.id, updatedUser);
    }
}
