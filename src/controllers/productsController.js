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
      const products = [];
      //const products = await productsCollection.findOne({ _id: ObjectId("") });
      return res.send(products);
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
export async function postProduct(req, res) {
  try {
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
    await productsCollection.deleteMany({});
    res.sendStatus(200);
  } catch (error) {
    res.status(500).send(error);
  }
}
