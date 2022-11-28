import cartStatus from "../contants/cartStatusConst.js";
import { cartsCollection, checkoutsCollection } from "../database.js";

export async function create(req, res) {
  try {
    const user = res.locals.user;

    const cart = await cartsCollection.findOne({
      user: user._id,
      status: cartStatus.OPEN.value,
    });

    if (!cart)
      return res.status(422).send("Erro, você não tem um carrinho aberto");

    await cartsCollection.updateOne(
      { _id: cart._id },
      { $set: { ...cart, status: cartStatus.CLOSED.value } }
    );

    const body = req.body;
    await checkoutsCollection.insertOne({ ...body, user: user._id });

    return res.sendStatus(201);
  } catch (error) {
    return res
      .status(500)
      .send({ message: "erro ao registrar checkout", success: false });
  }
}
