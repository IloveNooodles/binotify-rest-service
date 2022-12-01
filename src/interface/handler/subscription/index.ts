import { Request, Response, NextFunction } from 'express';
import * as HttpStatus from 'http-status-codes';

import { buildResponse } from '../../../util/build-response';
import { instanceOfStandardError } from '../../../util/object-validator';

import {
    getPendingSubscription,
    updateSubscriptionStatus
} from '../../../service/subscription.service';

const fetchAllPendingSubscription = () => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await getPendingSubscription(
                req.body.user_id
            );

            const statusCode = instanceOfStandardError(result)
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

const updateSubscriptionStatusById = () => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const subscription_id = Number(req.body.subscription_id) || null;
            const status: string = req.body.status || null;
            const singer_id = Number(req.body.singer_id) || null;

            const result = await updateSubscriptionStatus(
                req.body.user_id,
                singer_id,
                subscription_id,
                status
            );

            const statusCode = instanceOfStandardError(result)
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

export { fetchAllPendingSubscription, updateSubscriptionStatusById };
