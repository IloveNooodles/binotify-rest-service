import { Response } from 'express';

const buildResponse = (res: Response) => {
    return (status: number, data: any) => {
        res.status(status).send(data);
    };
};
