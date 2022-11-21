import Pg from '../infrastructure/database/postgresql';

import { hashPassword, validatePassword } from '../util/security';
import {
    insertUser,
    getUserByUsername,
    getUserByEmail
} from '../interface/repository/user';
import { IInsertUser } from '../interface/repository/user/type';
import { StandardError, ErrorCode, ErrorMessage } from '../common/error';

const registerUser = async (
    name: string,
    username: string,
    password: string,
    email: string
) => {
    try {
        await Pg.connect();

        const findUsername = await getUserByUsername(Pg, username);

        if (findUsername !== null) {
            const usernameInvalid: StandardError = {
                error_code: ErrorCode.USERNAME_ALREADY_EXIST,
                message: ErrorMessage.USERNAME_ALREADY_EXIST
            };
            return usernameInvalid;
        }

        const findEmail = await getUserByEmail(Pg, email);

        if (findEmail !== null) {
            const emailInvalid: StandardError = {
                error_code: ErrorCode.EMAIL_ALREADY_EXIST,
                message: ErrorMessage.EMAIL_ALREADY_EXIST
            };
            return emailInvalid;
        }

        const hashedPassword = hashPassword(password);
        const DEFAULT_ROLE = false;
        const user: IInsertUser = {
            name: name,
            username: username,
            email: email,
            password: hashedPassword,
            isAdmin: DEFAULT_ROLE
        };

        await insertUser(Pg, user);
    } catch (error) {
        throw error;
    }
};

export { registerUser };
