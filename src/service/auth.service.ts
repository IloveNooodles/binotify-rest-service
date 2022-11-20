import Pg from '../infrastructure/database/postgresql';

import { hashPassword, validatePassword } from '../util/security';
import { insertUser } from '../interface/repository/user';
import { IInsertUser } from '../interface/repository/user/type';

const registerUser = async (
    name: string,
    username: string,
    password: string,
    email: string,
    isAdmin: boolean
) => {
    try {
        await Pg.connect();

        const hashedPassword = hashPassword(password);
        const user: IInsertUser = {
            name: name,
            username: username,
            email: email,
            password: hashedPassword,
            isAdmin: isAdmin
        };

        await insertUser(Pg, user);
    } catch (error) {
        throw error;
    }
};

export { registerUser };
