import { env } from "@/env";
import { MongoClient } from "mongodb";

const uri = env.MONGODB_URI;

if (!uri) {
  throw new Error("Missing MONGODB_URI environment variable");
}

const globalForMongo = globalThis as typeof globalThis & {
  _mongoClientPromise?: Promise<MongoClient>;
};

const getClientPromise = () => new MongoClient(uri).connect();

const mongoClientPromise =
  env.NODE_ENV === "development"
    ? (globalForMongo._mongoClientPromise ??= getClientPromise())
    : getClientPromise();

const mongoClient = await mongoClientPromise;

export const client = mongoClient.db();
export const mongo = mongoClient;
export const clientPromise = mongoClientPromise;
