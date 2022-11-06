import { Request, Router } from 'express';

const router = Router();

router.get('/healthcheck', (req: Request, res) => {
    res.send({ 
        message: 'Hello GareArya Arkananta!',
    });
});

export default router;