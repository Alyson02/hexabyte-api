import signinModel from "../models/signinModel.js";
import dotenv from "dotenv";
dotenv.config();

export default async function signinValidationMiddleware(req, res, next) {
  try {
    const body = req.body;
    const { error } = signinModel.validate(body);
    if (error) {
      const erros = error.details.map((e) => e.message);
      return res.status(422).send({ erros, success: false });
    }
    next();
  } catch (error) {
    res.status(500).send({
      message: "Erro ao validar login",
      exception: error,
      success: false,
    });
  }
}
