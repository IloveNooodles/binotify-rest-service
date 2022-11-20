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
        const dbError: StandardError = {
            error_code: ErrorCode.DATABASE_ERROR,
            message: ErrorMessage.DATABASE_ERROR
        };
        throw dbError;
    }
};

export { insertUser };
