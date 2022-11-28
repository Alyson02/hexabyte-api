import userModel from "../models/userModel.js";

export default function signupValidationMiddleware(req, res, next) {
  try {
    const body = req.body;
    const { error } = userModel.validate(body, { abortEarly: false });

    if (error) {
      const erros = error.details.map((e) => e.message);
      return res.status(422).send({ erros, success: false });
    }

    next();
  } catch (error) {
    res.status(500).send({
      message: "Erro ao validar cadastro",
      exception: error,
      success: false,
    });
  }
}
