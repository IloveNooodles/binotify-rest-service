import * as HttpStatus from 'http-status-codes';
import { NextFunction, Response } from 'express';
import Joi from 'joi';

import { StandardError, ErrorCode, ErrorMessage } from '../common/error';
import { buildResponse } from '../util/build-response';

type httprequest = 'body' | 'params' | 'query' | 'headers';

export interface IHttpRequest {
    body?: Joi.ObjectSchema;
    params?: Joi.ObjectSchema;
    query?: Joi.ObjectSchema;
    headers?: Joi.ObjectSchema;
}

const validateRequest = (s: IHttpRequest) => {
    return (req: any, res: Response, next: NextFunction) => {
        for (const loc of Object.keys(s)) {
            const isValid = (
                s[loc as httprequest] as Joi.ObjectSchema
            ).validate(req[loc]);
            if (isValid?.error) {
                const error: StandardError = {
                    error_code: ErrorCode.API_VALIDATION_ERROR,
                    message: ErrorMessage.API_VALIDATION_ERROR
                };

                buildResponse(res, HttpStatus.StatusCodes.BAD_REQUEST, error);
                return;
            }
        }

        return next();
    };
};

export default validateRequest;
