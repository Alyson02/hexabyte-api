import { ObjectId } from "mongodb";
import { productsCollection } from "../database.js";

export async function getProducts(req, res) {
  try {
    const page = parseInt(req.query.page);
    const tipo = req.query.categoria;
    const busca = req.query.search;
    console.log(page);
    console.log(tipo);
    console.log(busca);
    if (page < 1) {
      res.status(400).send("Informe uma página válida!");
      return;
    }
    if (busca && !tipo) {
      const products = await productsCollection
        .find({ $text: { $search: busca } })
        .toArray();
      return res.send(products.slice(0, page * 10));
    }
    if (busca && tipo && tipo != "Home") {
      const products = await productsCollection
        .find({ $text: { $search: busca } })
        .toArray();
      return res.send(
        products
          .filter((produto) => produto.categoria == tipo)
          .slice(0, page * 10)
      );
    }

    if (tipo && !busca && tipo != "Home") {
      const products = await productsCollection
        .find({ categoria: tipo })
        .toArray();
      return res.send(products.slice(0, page * 10));
    } else {
      const products = await productsCollection.find({}).toArray();
      return res.send(products.slice(0, page * 10));
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
export async function getProductsbyId(req, res) {
  try {
    const { id } = req.params;
    if (id) {
      const products = await productsCollection.findOne({ _id: ObjectId(id) });
      return res.send(products);
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
export async function postProduct(req, res) {
  try {
    const user = res.locals.user;
    if (!user.admin) return res.sendStatus(401);
    await productsCollection.insertOne(req.body);
    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function editProduct(req, res) {
  const { id } = req.params;
  const { titulo, descricao, valor, categoria } = req.body;

  try {
    const user = res.locals.user;
    if (!user.admin) return res.sendStatus(401);
    await productsCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { titulo, descricao, valor, categoria } }
    );
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function deleteProduct(req, res) {
  const { id } = req.params;

  try {
    const user = res.locals.user;
    if (!user.admin) return res.sendStatus(401);
    const sim = await productsCollection.deleteOne({ _id: ObjectId(id) });
    console.log(sim);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).send("erro ao deletar");
    console.log(error);
  }
}

export async function getAllProducts(req, res) {
  try {
    const products = await productsCollection.find({}).toArray();
    res.send(products);
  } catch (error) {
    res.status(500).send({ message: "errro ao buscar dados", success: false });
  }
}
