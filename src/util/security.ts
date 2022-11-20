export const getJwtSecretKey = () => {
    return process.env.JWT_SECRET_KEY as string;
};
