import Joi from 'joi';

const JLoginRequest = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
});

const JRegisterRequest = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
    email: Joi.string().email().required(),
    is_admin: Joi.boolean().required(),
});

const JLoginResponse = Joi.object({
    token: Joi.string().required(),
});

const JRegisterResponse = Joi.object({
    token: Joi.string().required(),
});

export {
    JLoginRequest,
    JRegisterRequest,
    JLoginResponse,
    JRegisterResponse,
};