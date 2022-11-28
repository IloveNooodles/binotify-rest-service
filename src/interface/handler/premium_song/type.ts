import Joi from 'joi';

const JNewPremiumSong = Joi.object({
    title: Joi.string().required(),
    audio_file: Joi.string().required()
});

export { JNewPremiumSong };
