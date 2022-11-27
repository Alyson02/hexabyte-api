import Joi from "joi"

const userModel = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

export default userModel;