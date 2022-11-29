import Joi from 'joi';

const JNewPremiumSong = Joi.object({
    title: Joi.string().required(),
    audio_file: Joi.string().required()
});

const JUpdatePremiumSong = Joi.object({
    title: Joi.string(),
    audio_file: Joi.string()
});

export { JNewPremiumSong, JUpdatePremiumSong };
