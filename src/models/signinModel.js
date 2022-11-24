import Joi from "joi"

const userModel = Joi.object({
    email: Joi.string().email().required(),
    senha: Joi.string().required()
});

export default userModel;