import { Request, Response, NextFunction } from 'express';
import * as HttpStatus from 'http-status-codes';

import { buildResponse } from '../../../util/build-response';
import { instanceOfStandardError } from '../../../util/object-validator';
import {
    createNewPremiumSong,
    getAllPremiumSong
} from '../../../service/premium-song.service';

const newPremiumSong = () => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user_id = req.body.user_id;
            const result = await createNewPremiumSong(
                user_id,
                req.body.title,
                req.body.audio_file
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

const findAllPremiumSong = () => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user_id = req.body.user_id;
            const page: number = Number(req.query.page) || 1;
            const limit: number = Number(req.query.limit) || 10;

            const result = await getAllPremiumSong(user_id, page, limit);

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

export { newPremiumSong, findAllPremiumSong };
