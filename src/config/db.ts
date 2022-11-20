function resolvePort() {
    return typeof process.env.POSTGRES_PORT === 'number'
        ? process.env.POSTGRES_PORT
        : 5432;
}

const defaultConfig = {
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: resolvePort(),
    user: process.env.POSTGRES_USER
};

export const connection = {
    ...defaultConfig,
    host: process.env.POSTGRES_HOST || 'localhost'
};
