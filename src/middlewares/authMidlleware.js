import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
import { usersCollection } from "../database";

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send({ message: "Token não informado!" });
  }

  const parts = authHeader.split(" ");

  if (parts.length !== 2) {
    return res.status(401).send({ message: "Token invalido!" });
  }

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).send({ message: "Token deve ser do tipo Bearer" });
  }

  jwt.verify(token, process.env.SECRET, async (err, decoded) => {
    if (err) {
      console.error(err);
      return res.status(401).send({ message: "Token invalido!" });
    }

    const user = await usersCollection.find({ _id: decoded.id });

    if (!user || !user._id) {
      return res.status(401).send({ message: "Token invalido!" });
    }

    res.locals.user = user;

    return next();
  });
};
