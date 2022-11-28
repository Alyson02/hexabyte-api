import { ObjectID } from "bson";
import cartStatus from "../contants/cartStatusConst.js";
import { cartsCollection, productsCollection } from "../database.js";

export async function createCart(req, res) {
  try {
    const user = res.locals.user;
    const cartExists = await cartsCollection.findOne({
      user: user._id,
      status: cartStatus.OPEN.value,
    });

    if (!cartExists) {
      cartsCollection.insertOne({
        user: user._id,
        status: cartStatus.OPEN.value,
        products: [],
      });
      return res.send("carrinho aberto");
    }

    res.send("carrinho já aberto");
  } catch (error) {
    res
      .send({
        message: "Erro ao criar carrinho",
        exception: error,
        success: false,
      })
      .status(500);
  }
}

export async function addProduct(req, res) {
  try {
    const body = req.body;
    const user = res.locals.user;
    const cartExists = await cartsCollection.findOne({
      user: user._id,
      status: cartStatus.OPEN.value,
    });

    if (!body.products) {
      return res.send("Products é obrigatório! ").status(422);
    }

    if (!cartExists) {
      res.send("Abra um carrinho");
    } else {
      if (cartExists.status === cartStatus.CLOSED.value) {
        res.send("Abra um novo carrinho");
      } else {
        const products = body.products.map((x) => ObjectID(x));
        await cartsCollection.updateOne(
          { _id: cartExists._id },
          { $set: { products: [...cartExists.products, ...products] } }
        );
        res.send("produtos adicionados");
      }
    }
  } catch (error) {
    res
      .send({
        message: "Erro ao adicionar produto ao carrinho",
        exception: error,
        success: false,
      })
      .status(500);
  }
}

export async function getProdutos(req, res) {
  try {
    const user = res.locals.user;
    const cartExists = await cartsCollection.findOne({
      user: user._id,
      status: cartStatus.OPEN.value,
    });

    if (!cartExists) {
      res.send("Abra um carrinho");
    } else {
      if (cartExists.status === cartStatus.CLOSED.value) {
        res.send("Abra um novo carrinho");
      } else {
        const products = await productsCollection
          .find({
            _id: {
              $in: cartExists.products,
            },
          })
          .toArray();
        res.send(products);
      }
    }
  } catch (error) {
    res
      .send({
        message: "Erro ao pesquisar produtos do carrinho",
        exception: error,
        success: false,
      })
      .status(500);
  }
}

export async function removeProduct(req, res) {
  try {
    const { idProduto } = req.params;

    const user = res.locals.user;
    const cartExists = await cartsCollection.findOne({
      user: user._id,
      status: cartStatus.OPEN.value,
    });

    const productsFiltred = cartExists.products.filter(
      (x) => x.toString() != ObjectID(idProduto).toString()
    );

    console.log(cartExists);

    cartExists.products = productsFiltred;

    console.log(cartExists);

    await cartsCollection.updateOne(
      { _id: cartExists._id },
      { $set: { ...cartExists } }
    );

    res.send("produto removido");
  } catch (error) {
    res
      .send({
        message: "Erro ao deletar produtos do carrinho",
        exception: error,
        success: false,
      })
      .status(500);
  }
}
