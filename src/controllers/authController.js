import { usersCollection } from "../database.js";
import bcrypt from "bcrypt";

export async function signup(req, res) {
  try {
    const body = req.body;
    const senhaHash = bcrypt.hashSync(body.senha, 10);
    await usersCollection.insertOne({ ...body, senha: senhaHash });
    res.sendStatus(201);
  } catch (error) {
    res.send({
      message: "Erro ao validar cadastro",
      exception: error,
      success: false,
    });
  }
}
