import * as HttpStatus from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';
import { StandardError, errorCode, errorMessage } from '../domain/error';

export default function (apiKey: string) {
    return (req: Request, res: Response, next: NextFunction) => {
        const reqApiKey = req.get('x-api-key');
        if (reqApiKey !== apiKey) {
            const error: StandardError = {
                error_code: errorCode.INVALID_API_KEY,
                message: errorMessage.INVALID_API_KEY,
            };

            return res.status(HttpStatus.StatusCodes.UNAUTHORIZED).send(error);
        }

        next();
    };
}