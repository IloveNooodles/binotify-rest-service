import Pg from '../infrastructure/database/postgresql';
import { IUser } from '../domain/user';
import { getUserById } from '../interface/repository/user';
import { StandardError, ErrorCode, ErrorMessage } from '../common/error';

const getUserDetail = async (
    user_id: number
): Promise<any> => {
    const userDetail: IUser | null = await getUserById(Pg, user_id);

    if (userDetail === null) {
        const userNotFound: StandardError = {
            error_code: ErrorCode.USER_NOT_FOUND,
            message: ErrorMessage.USER_NOT_FOUND
        };
        return userNotFound;
    }

    return {
        id: userDetail.id,
        name: userDetail.name,
        username: userDetail.username,
        email: userDetail.email,
        isAdmin: userDetail.isAdmin
    };
};

export { getUserDetail };
