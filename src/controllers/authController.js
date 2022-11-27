import { usersCollection } from "../database.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

export async function signin(req, res) {
  try {
    const body = req.body;

    const user = await usersCollection.findOne({ email: body.email });

    if (!user) return res.status(400).send("Email ou senha inválidos");

    const senhaEhValida = bcrypt.compareSync(body.password, user.password);

    if (!senhaEhValida) return res.status(400).send("Email ou senha inválidos");

    const token = jwt.sign(
      { id: user._id, nome: user.nome, email: user.email },
      process.env.SECRET,
      { expiresIn: 86400 }
    );

    res.send({ token, nome: user.nome });
  } catch (error) {
    res.send({
      message: "Erro ao logar",
      exception: error,
      success: false,
    });
  }
}
