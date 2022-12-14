import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const mongoClient = new MongoClient(process.env.MONGO_URI);

try {
  await mongoClient.connect();
  console.log("Mongo connected");
} catch (error) {
  console.log("Erro ao conectar ao mongo", error);
}

let db = mongoClient.db(process.env.MONGO_DB);

export const usersCollection = db.collection("users");
export const productsCollection = db.collection("products");
export const cartsCollection = db.collection("carts");
export const checkoutsCollection = db.collection("checkout");
