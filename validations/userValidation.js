import Joi from 'joi';  


export const createUserSchema = Joi.object({
    full_name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone_number: Joi.string().optional().allow(''),
    interest: Joi.string().valid(
        'I need free cloud storage',
        'I want email and payments in one place',
        'I want to support a Nigerian-made platform',
        'I want a better email alternative',
        'All of the above'
    ).required(),
});
