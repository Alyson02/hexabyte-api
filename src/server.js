import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { usersCollection } from "./database.js";

dotenv.config();

const server = express();
server.use(cors());
server.use(express.json());

await usersCollection.insertOne({nome:"hello world"});
const hello = await usersCollection.find({}).toArray();

server.get("/teste", (req, res) => res.send(hello));


server.listen(process.env.PORT, () =>
  console.log(`Server is listen in http://localhost:${process.env.PORT}`)
);
