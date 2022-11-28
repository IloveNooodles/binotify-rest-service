import { Request, Response, Router } from 'express';

import validateRequest from '../../middleware/request-validation';
import { getJwtSecretKey } from '../../util/security';
import {
    JLoginRequest,
    JRegisterRequest
} from '../../interface/handler/auth/type';
import { JNewPremiumSong } from '../../interface/handler/premium_song/type';
import { login, register } from '../../interface/handler/auth';
import handleRequestAsync from '../../middleware/handle-request-async';
import validateApiKey from '../../middleware/api-key-validation';
import { getUser } from '../../interface/handler/user';
import {
    newPremiumSong,
    findAllPremiumSong
} from '../../interface/handler/premium_song';

const router = Router();

router.get('/healthcheck', (req: Request, res: Response) => {
    res.send({
        message: 'Hello GareArya Arkananta!'
    });
});

router.post(
    '/login',
    validateRequest({
        body: JLoginRequest
    }),
    login()
);

router.post(
    '/register',
    validateRequest({
        body: JRegisterRequest
    }),
    register()
);

router.get('/user', validateApiKey(), getUser());

router.post(
    '/premium-song',
    validateRequest({ body: JNewPremiumSong }),
    validateApiKey(),
    newPremiumSong()
);

router.get('/premium-song', validateApiKey(), findAllPremiumSong());

export default router;
