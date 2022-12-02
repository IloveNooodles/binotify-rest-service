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
            let page: number = Number(req.query.page) || 1;
            let limit: number = Number(req.query.limit) || 10;

            if (page < 1 || limit < 1) {
                page = 1;
                limit = 10;
            }

            const result = await getPendingSubscription(
                req.body.user_id,
                page,
                limit
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
            const subscription_id = Number(req.body.subscription_id);
            const status: string = req.body.status || null;
            const singer_id = Number(req.body.singer_id);

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
