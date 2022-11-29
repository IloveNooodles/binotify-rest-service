import { Request, Response, NextFunction } from 'express';
import * as HttpStatus from 'http-status-codes';

import { buildResponse } from '../../../util/build-response';
import { instanceOfStandardError } from '../../../util/object-validator';
import {
    createNewPremiumSong,
    getSingerAllPremiumSong,
    getSingerPremiumSong
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

const findSingerAllPremiumSong = () => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user_id = req.body.user_id;
            const page: number = Number(req.query.page) || 1;
            const limit: number = Number(req.query.limit) || 10;

            const result = await getSingerAllPremiumSong(user_id, page, limit);

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

const findPremiumSong = () => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user_id = req.body.user_id;
            const song_id = Number(req.params.song_id) || null;

            const result = await getSingerPremiumSong(
                user_id,
                song_id
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

export { newPremiumSong, findSingerAllPremiumSong, findPremiumSong };
