import { Request, Response, NextFunction } from 'express';
import * as HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';

import { getJwtSecretKey } from '../../../util/security';
import { StandardError, ErrorCode, ErrorMessage } from '../../../common/error';
import { registerUser } from '../../../service/auth.service';

const login = () => {
    return (req: Request, res: Response, next: NextFunction) => {
        const jwtSecretKey: string = getJwtSecretKey();

        let data = {
            time: Date(),
            userId: 12
        };

        const token = jwt.sign(data, jwtSecretKey);
        res.status(HttpStatus.StatusCodes.OK).send({ token });
    };
};

const register = () => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await registerUser(
                req.body.name,
                req.body.username,
                req.body.password,
                req.body.email,
                req.body.is_admin
            );

            res.status(HttpStatus.StatusCodes.OK).send();
        } catch (error) {
            res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).send(
                error
            );
        }
    };
};

export { login, register };
