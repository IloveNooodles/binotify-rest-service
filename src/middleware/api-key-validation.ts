import * as HttpStatus from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';
import { StandardError, ErrorCode, ErrorMessage } from '../common/error';
import { buildResponse } from '../util/build-response';
import jwt, { JwtPayload } from 'jsonwebtoken';

const validateApiKey = () => {
    return (req: Request, res: Response, next: NextFunction) => {
        const token = req.get('x-api-key');
        const jwtSecretKey: string = process.env.JWT_SECRET as string;

        if (!token) {
            const error: StandardError = {
                error_code: ErrorCode.API_KEY_MISSING,
                message: ErrorMessage.API_KEY_MISSING
            };

            buildResponse(res, HttpStatus.StatusCodes.UNAUTHORIZED, error);
            return;
        }

        jwt.verify(token, jwtSecretKey, (err, decoded: any) => {
            if (err) {
                const error: StandardError = {
                    error_code: ErrorCode.INVALID_API_KEY,
                    message: ErrorMessage.INVALID_API_KEY
                };

                buildResponse(res, HttpStatus.StatusCodes.UNAUTHORIZED, error);
                return;
            }

            if (decoded) {
                req.body.user_id = decoded.id;
            }

            next();
        });

        return;
    };
};

export default validateApiKey;
