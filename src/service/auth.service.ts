import Pg from '../infrastructure/database/postgresql';
import jwt from 'jsonwebtoken';

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

const loginUser = async (
    username: string,
    password: string
): Promise<string | StandardError> => {
    try {
        await Pg.connect();

        const user = await getUserByUsername(Pg, username);

        if (user === null) {
            const userNotFound: StandardError = {
                error_code: ErrorCode.USER_NOT_FOUND,
                message: ErrorMessage.USER_NOT_FOUND
            };
            return userNotFound;
        }

        const isPasswordValid: boolean = validatePassword(
            password,
            user.password
        );

        if (!isPasswordValid) {
            const passwordInvalid: StandardError = {
                error_code: ErrorCode.PASSWORD_INVALID,
                message: ErrorMessage.PASSWORD_INVALID
            };
            return passwordInvalid;
        }

        const jwtSecretKey: string = process.env.JWT_SECRET as string;
        const timeExpire: string = process.env.JWT_TIME_EXPIRE as string;
        const token = jwt.sign(
            {
                id: user.id,
                username: user.username,
                email: user.email,
                isAdmin: user.isAdmin
            },
            jwtSecretKey,
            {
                expiresIn: timeExpire
            }
        );

        return token;
    } catch (error) {
        throw error;
    }
};

export { registerUser, loginUser };
