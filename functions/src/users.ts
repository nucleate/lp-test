import * as functions from 'firebase-functions';
import { UsersRepositoryImpl } from './repositories/UsersRepository';
import { UsersServiceImpl } from './services/UsersService';
import { BaseResponse } from './types/BaseResponse';
import { Logger } from './utils/Logger';
import { ResponseHandler } from './utils/ResponseHandler';

const usersRepository = new UsersRepositoryImpl();
const usersService = new UsersServiceImpl(usersRepository);

export const getUserById = functions.https.onRequest(async (request: functions.https.Request, response: functions.Response<BaseResponse<unknown>>) => {
    Logger.info(`GetUserById request`, request);

    const userId = request.params[0];
    const result = await usersService.getUserById(userId);

    Logger.info(`GetUserById service result`, result);

    ResponseHandler.handle(response, result);
});

export const updateUser = functions.https.onRequest(async (request: functions.https.Request, response: functions.Response<BaseResponse<unknown>>) => {
    Logger.info(`UpdateUser request`, request);

    const user = request.body;
    const result = await usersService.updateUser(user);

    Logger.info(`UpdateUser service result`, result);

    ResponseHandler.handle(response, result);
});
