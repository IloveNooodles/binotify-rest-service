import { Request, Response, NextFunction } from 'express';
import * as HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';

import { getJwtSecretKey } from '../../../util/security';

const login = () => {
    return (req: Request, res: Response, next: NextFunction) => {
        const jwtSecretKey: string = getJwtSecretKey();

        /*
            TODO: Implement your login logic here.
        */
        let data = {
            time: Date(),
            userId: 12,
        }

        const token = jwt.sign(data, jwtSecretKey);
        res.status(HttpStatus.StatusCodes.OK).send({ token });
    };
}

export {
    login,
}