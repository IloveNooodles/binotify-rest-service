import { IUser } from '../../../domain/user';
import { IInsertUser } from './type';
import { StandardError, ErrorCode, ErrorMessage } from '../../../common/error';
import Pg from '../../../infrastructure/database/postgresql';

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
        console.log(error);
        const dbError: StandardError = {
            error_code: ErrorCode.DATABASE_ERROR,
            message: ErrorMessage.DATABASE_ERROR
        };
        throw dbError;
    }
};

const getUserByUsername = async (db: any, username: string) => {
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

        const user : IUser = {
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

const getUserByEmail = async (db: any, email: string) => {
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

        const user : IUser = {
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

// getUserByEmail(Pg, 'gdryrp@gmail.com').then((user) => {
//     console.log(user);
// }).catch((error) => {
//     console.log(error);
// });

export { insertUser, getUserByUsername, getUserByEmail };
