import checkoutModel from "../models/checkoutModel.js";

export default function checkoutValidation(req, res, next) {
  try {
    const body = req.body;
    const { error } = checkoutModel.validate(body);

    if (error) {
      const erros = error.details.map((e) => e.message);
      return res.status(422).send({ erros, success: false });
    }

    next();
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Erro ao validar o checkout", success: false });
  }
}
