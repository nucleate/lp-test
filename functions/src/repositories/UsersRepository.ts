import * as admin from 'firebase-admin';
import { User } from '../types/contracts/User';
import { HttpStatusCode } from '../types/HttpStatusCode';
import { Logger } from '../utils/Logger';
import { ServiceResult } from '../utils/ServiceResult';

export interface UsersRepository {
    getById(id: string): Promise<ServiceResult<User>>;
    create(id: string, user: User): Promise<ServiceResult<User>>;
}

export class UsersRepositoryImpl implements UsersRepository {
    //
    private readonly db: admin.firestore.Firestore;

    constructor() {
        if (!admin.apps.length) {
            admin.initializeApp();
        }
        this.db = admin.firestore();
    }

    async getById(id: string): Promise<ServiceResult<User>> {
        Logger.info(`UsersRepository::getById::call`, { id });

        try {
            const userDoc = await this.db.collection('users').doc(id).get();
            if (!userDoc.exists) {
                Logger.info(`UsersRepository::getById::UserNotFound`, { id });

                return ServiceResult.failed(HttpStatusCode.NOT_FOUND, 'User not found');
            }
            const user = userDoc.data() as User;

            Logger.info(`UsersRepository::getById::user`, user);

            return ServiceResult.succeeded<User>(user);
        } catch (e) {
            Logger.error(`UsersRepository::getById::error`, e);

            return ServiceResult.failed(HttpStatusCode.INTERNAL_SERVER_ERROR, `${e}`);
        }
    }

    async create(id: string, user: User): Promise<ServiceResult<User>> {
        Logger.info(`UsersRepository::create::call`, { id, user });

        try {
            await this.db.collection('users').doc(id).set(user);

            return ServiceResult.succeeded<User>(user);
        } catch (e) {
            Logger.error(`UsersRepository::create::error`, e);

            return ServiceResult.failed(HttpStatusCode.INTERNAL_SERVER_ERROR, `${e}`);
        }
    }
}
