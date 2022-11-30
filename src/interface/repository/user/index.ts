import { IUser } from '../../../domain/user';
import { IInsertUser } from './type';
import { StandardError, ErrorCode, ErrorMessage } from '../../../common/error';

const insertUser = async (db: any, user: IInsertUser) => {
    try {
        const prismaClient = await db.prisma();

        await prismaClient.user.create({
            data: {
                name: user.name,
                username: user.username,
                email: user.email,
                password: user.password,
                is_admin: user.isAdmin
            }
        });
    } catch (error) {
        const dbError: StandardError = {
            error_code: ErrorCode.DATABASE_ERROR,
            message: ErrorMessage.DATABASE_ERROR
        };
        throw dbError;
    }
};

const selectUserByUsername = async (db: any, username: string) => {
    try {
        const prismaClient = await db.prisma();

        let userResult = await prismaClient.user.findMany({
            where: {
                username: username
            }
        });

        if (userResult.length === 0) {
            return null;
        }

        userResult = userResult[0];

        const user: IUser = {
            id: userResult.user_id,
            name: userResult.name,
            username: userResult.username,
            email: userResult.email,
            password: userResult.password,
            isAdmin: userResult.is_admin
        };

        return user;
    } catch (error) {
        const dbError: StandardError = {
            error_code: ErrorCode.DATABASE_ERROR,
            message: ErrorMessage.DATABASE_ERROR
        };
        throw dbError;
    }
};

const selectUserByEmail = async (db: any, email: string) => {
    try {
        const prismaClient = await db.prisma();

        let userResult = await prismaClient.user.findMany({
            where: {
                email: email
            }
        });

        if (userResult.length === 0) {
            return null;
        }

        userResult = userResult[0];

        const user: IUser = {
            id: userResult.user_id,
            name: userResult.name,
            username: userResult.username,
            email: userResult.email,
            password: userResult.password,
            isAdmin: userResult.is_admin
        };

        return user;
    } catch (error) {
        const dbError: StandardError = {
            error_code: ErrorCode.DATABASE_ERROR,
            message: ErrorMessage.DATABASE_ERROR
        };
        throw dbError;
    }
};

const selectUserById = async (db: any, id: number) => {
    try {
        const prismaClient = await db.prisma();

        let userResult = await prismaClient.user.findMany({
            where: {
                user_id: id
            }
        });

        if (userResult.length === 0) {
            return null;
        }

        userResult = userResult[0];

        const user: IUser = {
            id: userResult.user_id,
            name: userResult.name,
            username: userResult.username,
            email: userResult.email,
            password: userResult.password,
            isAdmin: userResult.is_admin
        };

        return user;
    } catch (error) {
        const dbError: StandardError = {
            error_code: ErrorCode.DATABASE_ERROR,
            message: ErrorMessage.DATABASE_ERROR
        };
        throw dbError;
    }
};

const selectAllSinger = async (db: any) => {
    try {
        const prismaClient = await db.prisma();

        const userResult = await prismaClient.user.findMany({
            where: {
                is_admin: false
            }
        });

        const users: IUser[] = [];

        for (let i = 0; i < userResult.length; i++) {
            let user: IUser = {
                id: userResult[i].user_id,
                name: userResult[i].name,
                username: userResult[i].username,
                email: userResult[i].email,
                password: userResult[i].password,
                isAdmin: userResult[i].is_admin
            };

            users.push(user);
        }

        return users;
    } catch (error) {
        const dbError: StandardError = {
            error_code: ErrorCode.DATABASE_ERROR,
            message: ErrorMessage.DATABASE_ERROR
        };
        throw dbError;
    }
};

const selectSingerById = async (db: any, id: number) => {
    try {
        const prismaClient = await db.prisma();

        let userResult = await prismaClient.user.findMany({
            where: {
                user_id: id,
                is_admin: false
            }
        });

        if (userResult.length === 0) {
            return null;
        }

        userResult = userResult[0];

        const user: IUser = {
            id: userResult.user_id,
            name: userResult.name,
            username: userResult.username,
            email: userResult.email,
            password: userResult.password,
            isAdmin: userResult.is_admin
        };

        return user;
    } catch (error) {
        const dbError: StandardError = {
            error_code: ErrorCode.DATABASE_ERROR,
            message: ErrorMessage.DATABASE_ERROR
        };
        throw dbError;
    }
};

export {
    insertUser,
    selectUserByUsername,
    selectUserByEmail,
    selectUserById,
    selectAllSinger,
    selectSingerById
};
