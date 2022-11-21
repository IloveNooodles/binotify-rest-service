import { Request, Response, NextFunction } from 'express';
import * as HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';

import { getJwtSecretKey } from '../../../util/security';
import { StandardError, ErrorCode, ErrorMessage } from '../../../common/error';
import { registerUser } from '../../../service/auth.service';
import { buildResponse } from '../../../middleware/build-response';

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
            const result = await registerUser(
                req.body.name,
                req.body.username,
                req.body.password,
                req.body.email,
                req.body.is_admin
            );

            const statusCode = result && result.error_code ? HttpStatus.StatusCodes.BAD_REQUEST : HttpStatus.StatusCodes.OK;
            buildResponse(res, statusCode, result);
        } catch (error) {
            buildResponse(res, HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR, error);
        }
    };
};

export { login, register };
