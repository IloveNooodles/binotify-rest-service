import { Request, Response, Router } from 'express';

import validateRequest from '../../middleware/request-validation';
import { getJwtSecretKey } from '../../util/security';
import { JLoginRequest } from '../../interface/handler/auth/type';
import { login } from '../../interface/handler/auth';
import handleRequestAsync from '../../middleware/handle-request-async';

const router = Router();

router.get(
    '/healthcheck', 
    (req: Request, res: Response) => {
        res.send({ 
            message: 'Hello GareArya Arkananta!',
        });
    }
);

router.post(
    '/login',
    validateRequest({
        body: JLoginRequest
    }),
    login(),
);

export default router;