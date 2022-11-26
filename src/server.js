import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./routes/authRoutes.js";
import productsRouter from "./routes/productsRoutes.js";
import cartRouter from "./routes/cartRoutes.js";

dotenv.config();

const server = express();
server.use(cors());
server.use(express.json());
server.use(authRouter);
server.use(productsRouter);
server.use(cartRouter);

server.listen(process.env.PORT, () =>
  console.log(`Server is listen in http://localhost:${process.env.PORT}`)
);
