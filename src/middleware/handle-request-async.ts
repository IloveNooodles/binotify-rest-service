import { Request, Response, NextFunction } from 'express';

const handleRequestAsync = (handler: (req: Request) => Promise<any>) => {
    return (req: Request, res: Response, next: NextFunction) => {
        handler(req)
            .then((response) => {
                res.locals.response_data = response;
                return next(null);
            })
            .catch((err) => {
                err.context = {
                    ...err.context,
                    reqBody: req.body,
                    reqIp: req.ip,
                    reqParams: req.params,
                    reqQuery: req.query
                };
                return next(err);
            });
    };
};

export default handleRequestAsync;
