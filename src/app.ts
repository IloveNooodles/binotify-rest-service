import express from 'express';
import cors from 'cors';

import routes from './infrastructure/http/route';

class App {
    public server;

    constructor() {
        this.server = express();
        const whitelist = [process.env.BINOTIFY_PREMIUM_FRONTEND_URL];
        const corsOptions = {
            origin: function (
                origin: string | undefined,
                callback: (
                    arg0: Error | null,
                    arg1: boolean | undefined
                ) => void
            ) {
                return callback(null, true);
            }
        };
        this.server.use(cors(corsOptions));

        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.server.use(express.json());
    }

    routes() {
        this.server.use(routes);
    }
}

export default new App().server;
