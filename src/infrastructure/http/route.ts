import { Request, Response, Router } from 'express';
import multer from 'multer';

import { login, register } from '../../interface/handler/auth';
import {
  JLoginRequest,
  JRegisterRequest
} from '../../interface/handler/auth/type';
import {
  deletePremiumSong, editPremiumSong, findPremiumSong, findSingerAllPremiumSong, newPremiumSong
} from '../../interface/handler/premium_song';
import {
  findAllSinger,
  findSingerAllPremiumSongWithUserId
} from '../../interface/handler/singer';
import {
  fetchAllPendingSubscription,
  updateSubscriptionStatusById
} from '../../interface/handler/subscription';
import { getUser } from '../../interface/handler/user';
import validateApiKey from '../../middleware/api-key-validation';
import validateRequest from '../../middleware/request-validation';

const router = Router();

const STATIC_AUDIO_FILE_PATH = 'public/audio';
const PUBLIC_AUDIO_PATH = process.env.APP_BASE_URL + '/audio';

const storageFile = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, STATIC_AUDIO_FILE_PATH);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const filename = file.originalname.replace(/\s/g, '');
        const newFileName = uniqueSuffix + '-' + filename;

        req.body.audio_path = PUBLIC_AUDIO_PATH + '/' + newFileName;
        cb(null, newFileName);
    }
});

const upload = multer({ storage: storageFile });

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
    upload.single('audio_file'),
    validateApiKey(),
    newPremiumSong()
);

router.get('/premium-song', validateApiKey(), findSingerAllPremiumSong());

router.get('/premium-song/:song_id', validateApiKey(), findPremiumSong());

router.put(
    '/premium-song/:song_id',
    upload.single('audio_file'),
    validateApiKey(),
    editPremiumSong()
);

router.delete('/premium-song/:song_id', validateApiKey(), deletePremiumSong());

router.get('/singer', findAllSinger());

router.post('/singer/:singer_id', findSingerAllPremiumSongWithUserId());

router.get('/subscription', validateApiKey(), fetchAllPendingSubscription());

router.post(
    '/subscription/decision',
    validateApiKey(),
    updateSubscriptionStatusById()
);

export default router;
