import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URL!;

let client;
let clientPromise: Promise<MongoClient>;

if (!process.env.MONGODB_URL) {
  throw new Error("Add Mongo URL to .env.local");
}

client = new MongoClient(uri);
clientPromise = client.connect();

export default clientPromise;
