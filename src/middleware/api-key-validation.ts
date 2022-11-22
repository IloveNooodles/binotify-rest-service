import * as HttpStatus from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';
import { StandardError, ErrorCode, ErrorMessage } from '../common/error';
import { buildResponse } from '../util/build-response';

const validateApiKey = (apiKey: string) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const reqApiKey = req.get('x-api-key');
        if (reqApiKey !== apiKey) {
            const error: StandardError = {
                error_code: ErrorCode.INVALID_API_KEY,
                message: ErrorMessage.INVALID_API_KEY
            };

            buildResponse(res, HttpStatus.StatusCodes.UNAUTHORIZED, error);
            return;
        }

        next();
    };
};

export default validateApiKey;
