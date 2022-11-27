import Joi from "joi"

const userModel = Joi.object({
    nome: Joi.string().required().min(5),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(5),
    
});

export default userModel;