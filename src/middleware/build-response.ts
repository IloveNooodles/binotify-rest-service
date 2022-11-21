import { Response } from 'express';
import * as HttpStatus from 'http-status-codes';

export const buildResponse = (res: Response, httpStatus: number, data: any) => {
    let statusText = HttpStatus.getStatusText(httpStatus).toUpperCase();
    statusText = statusText.replace(/ /g, '_');

    const resData = {
        status: statusText,
        data: data ? data : null
    };
    res.status(httpStatus).send(resData);
};
