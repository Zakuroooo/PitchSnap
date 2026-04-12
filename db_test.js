const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: ".env.local" });

const uri = process.env.MONGODB_URI;

async function test() {
  await mongoose.connect(uri);
  const db = mongoose.connection.db;
  const gens = await db.collection("generations").find({}).limit(1).toArray();
  console.log(gens);
  mongoose.disconnect();
}
test().catch(console.error);
