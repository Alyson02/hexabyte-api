import { ObjectId } from "mongodb";
import { productsCollection } from "../database.js";

export async function getProducts(req, res) {
  try {
    const { id } = req.params;
    if (id) {
      const products = await productsCollection.findOne({ _id: ObjectId(id) });
      res.send(products);
    } else {
      let products = await productsCollection.find({}).toArray();
      const page = parseInt(req.query.page);
      const tipo = req.query.categoria;
      const busca = req.query.search;
      console.log(busca);
      if (busca) {
        products = await productsCollection
          .find({ $text: { $search: busca } })
          .toArray();
        if (tipo) {
          products = products.filter((produto) => produto.categoria == tipo);
        }
        return res.send(products);
      }
      if (tipo && !busca) {
        products = products.filter((produto) => produto.categoria == tipo);
      }
      if (page < 1 && !id) {
        res.status(400).send("Informe uma página válida!");
        return;
      } else {
        let limiteinf = 0 + (page - 1) * 10;
        let limitesup = 10 + (page - 1) * 10;
        if (page * 10 - products.length > 10) {
          return;
        }
        if (limiteinf < 0) {
          res.send(products.slice(0, limitesup));
          return;
        }
        console.log(products)
        res.send(products.slice(limiteinf, limitesup));
      }
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function postProduct(req, res) {
  try {
    await productsCollection.insertMany(req.body);
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
    await db
      .collection("products")
      .updateOne(
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
    await db.collection("products").deleteOne({ _id: ObjectId(id) });
    res.sendStatus(200);
  } catch (error) {
    res.status(500).send(error);
  }
}
