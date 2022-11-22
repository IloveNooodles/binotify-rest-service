import { Request, Response, NextFunction } from 'express';
import * as HttpStatus from 'http-status-codes';

import { getJwtSecretKey } from '../../../util/security';
import { StandardError, ErrorCode, ErrorMessage } from '../../../common/error';
import { registerUser, loginUser } from '../../../service/auth.service';
import { buildResponse } from '../../../util/build-response';

const login = () => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const username = req.body.username;
            const password = req.body.password;

            const user = {
                username: username,
                password: password
            };

            const result = await loginUser(username, password);

            if (typeof result !== 'string') {
                buildResponse(res, HttpStatus.StatusCodes.BAD_REQUEST, result);
            } else {
                buildResponse(res, HttpStatus.StatusCodes.OK, {
                    token: result
                });
            }
        } catch (error) {
            buildResponse(
                res,
                HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR,
                error
            );
        }
    };
};

const register = () => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await registerUser(
                req.body.name,
                req.body.username,
                req.body.password,
                req.body.email
            );

            const statusCode =
                result && result.error_code
                    ? HttpStatus.StatusCodes.BAD_REQUEST
                    : HttpStatus.StatusCodes.OK;

            buildResponse(res, statusCode, result);
        } catch (error) {
            buildResponse(
                res,
                HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR,
                error
            );
        }
    };
};

export { login, register };
