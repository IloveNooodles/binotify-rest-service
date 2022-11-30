import { Request, Response, NextFunction } from 'express';
import * as HttpStatus from 'http-status-codes';

import { buildResponse } from '../../../util/build-response';
import { instanceOfStandardError } from '../../../util/object-validator';

import {
    getAllSinger,
    getSingerPremiumSong
} from '../../../service/singer.service';

const findAllSinger = () => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            // const result = await getAllSinger();
            // const statusCode = instanceOfStandardError(result)
            //     ? HttpStatus.StatusCodes.BAD_REQUEST
            //     : HttpStatus.StatusCodes.OK;
            // buildResponse(res, statusCode, result);
        } catch (error) {
            buildResponse(
                res,
                HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR,
                error
            );
        }
    };
};

const findSingerAllPremiumSongWithUserId = () => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const singer_id = Number(req.params.singer_id) || null;
            const user_id = Number(req.body.user_id) || null;

            const result = await getSingerPremiumSong(singer_id, user_id);

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

export { findAllSinger, findSingerAllPremiumSongWithUserId };
