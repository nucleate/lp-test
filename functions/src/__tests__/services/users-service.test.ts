import { UsersServiceImpl } from '../../services/UsersService';
import { HttpStatusCode } from '../../types/HttpStatusCode';
import { DataGenerator, UserMock } from '../../__mocks__/DataGenerator';
import { UsersRepositoryMock } from '../../__mocks__/repositories/UsersRepositoryMock';

describe('Test users service', () => {
    test('Should return user not found error', async () => {
        //Arrange
        const user = DataGenerator.generateUser();
        const usersRepository = new UsersRepositoryMock();
        const usersService = new UsersServiceImpl(usersRepository);

        //Act
        const result = await usersService.getUserById(user.id);

        //Asert
        expect(result.failure).toBeTruthy();
        expect(result.code).toBe(HttpStatusCode.NOT_FOUND);
    });

    test('Should return user by id', async () => {
        //Arrange
        const user = DataGenerator.generateUser();
        const usersRepository = new UsersRepositoryMock();
        const usersService = new UsersServiceImpl(usersRepository);

        usersRepository.create(user.id, user);

        //Act
        const result = await usersService.getUserById(user.id);

        //Asert
        expect(result.failure).toBeFalsy();
        expect(result.code).toBe(HttpStatusCode.OK);
        expect(result.content).toStrictEqual(user);
    });

    test('Should create and return a new user', async () => {
        //Arrange
        const user = DataGenerator.generateUser();
        const usersRepository = new UsersRepositoryMock();
        const usersService = new UsersServiceImpl(usersRepository);

        //Act
        const result = await usersService.updateUser(user);

        //Asert
        expect(result.failure).toBeFalsy();
        expect(result.code).toBe(HttpStatusCode.OK);
        expect(result.content).toStrictEqual(user);
    });

    test('Should update and return existing user', async () => {
        //Arrange
        const existingUser = DataGenerator.generateUser({ name: undefined });
        const existingUserId = existingUser.id;
        const updateProps = DataGenerator.generateUser({ id: existingUserId });
        const usersRepository = new UsersRepositoryMock();
        const usersService = new UsersServiceImpl(usersRepository);
        const expcetedData: UserMock = {
            id: existingUserId,
            name: updateProps.name,
            score: updateProps.score,
            coins: existingUser.coins + updateProps.coins,
        };

        usersRepository.create(existingUserId, existingUser);

        //Act
        const result = await usersService.updateUser(updateProps);

        //Asert
        expect(result.failure).toBeFalsy();
        expect(result.code).toBe(HttpStatusCode.OK);
        expect(result.content).toStrictEqual(expcetedData);
    });
});
