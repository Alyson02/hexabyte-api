import userModel from "../models/userModel.js";

export default function signupValidationMiddleware(req, res, next) {
  try {
    const body = req.body;
    const { error } = userModel.validate(body, { abortEarly: false });

    if (error) {
      const erros = error.details.map((e) => e.message);
      return res.send({ erros, success: false }).status(422);
    }

    next();
  } catch (error) {
    res.send({
      message: "Erro ao validar cadastro",
      exception: error,
      success: false,
    });
  }
}
