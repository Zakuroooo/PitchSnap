const mongoose = require('mongoose');

// Bypass the TS wrapper and connect directly for a quick check
const uri = process.env.MONGODB_URI || "mongodb+srv://pranaysarkar:Xy0eE9zHh0A5JkIf@cluster0.dbw3x.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

async function check() {
  await mongoose.connect(uri);
  const db = mongoose.connection.db;
  const docs = await db.collection('generations').find({}).toArray();
  console.log("Documents in DB:");
  console.dir(docs.map(d => ({ _id: d._id.toString(), viewId: d.viewId })), { depth: null });
  process.exit(0);
}
check();
