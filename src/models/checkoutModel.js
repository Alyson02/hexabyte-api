import Joi from "joi";

const checkoutModel = Joi.object({
  paymentForm: Joi.string().valid("boleto", "pix", "cartao").required(),
  cep: Joi.string().required(),
  numero: Joi.number().required(),
});

export default checkoutModel;
