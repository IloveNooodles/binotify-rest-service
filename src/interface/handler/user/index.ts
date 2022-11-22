import { Request, Response, NextFunction } from 'express';
import * as HttpStatus from 'http-status-codes';

import { getUserDetail } from '../../../service/user.service';
import { buildResponse } from '../../../util/build-response';
import { instanceOfStandardError } from '../../../util/object-validator';

const getUser = () => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const user_id = req.body.user_id;
        const result = await getUserDetail(user_id);

        const statusCode = instanceOfStandardError(result)
            ? HttpStatus.StatusCodes.BAD_REQUEST
            : HttpStatus.StatusCodes.OK;

        buildResponse(res, statusCode, result);
    };
};

export { getUser };
