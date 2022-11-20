import ph from 'password-hash';

export const getJwtSecretKey = () => {
    return process.env.JWT_SECRET_KEY as string;
};

export const hashPassword = (password: string) => {
    return ph.generate(password);
};

export const validatePassword = (password: string, hash: string) => {
    return ph.verify(password, hash);
};
