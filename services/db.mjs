import { MongoClient } from "mongodb";
import * as mongo from "mongodb";
const uri = "mongodb+srv://web:Password1@devcluster-1.oya5nr1.mongodb.net/";
const dbName = "hockey";

export async function getAll(collectionName) {
  const client = new MongoClient(uri);

  try {
    // Connect to the MongoDB server
    await client.connect();

    // Access the database and collection
    const database = client.db(dbName);
    const collection = database.collection(collectionName);

    // Fetch all players
    const players = await collection.find({}).toArray();

    return players;
  } finally {
    // Close the MongoDB connection
    await client.close();
  }
}

export async function getOne(collectionName, id) {
  const client = new MongoClient(uri);

  try {
    // Connect to the MongoDB server
    await client.connect();

    // Access the database and collection
    const database = client.db(dbName);
    const collection = database.collection(collectionName);

    // Fetch all players
    const player = await collection.findOne({
      _id: new mongo.ObjectId(id),
    });

    return player;
  } finally {
    // Close the MongoDB connection
    await client.close();
  }
}

export async function addMany(collectionName, items) {
  const client = new MongoClient(uri);

  try {
    // Connect to the MongoDB server
    await client.connect();

    // Access the database and collection
    const database = client.db(dbName);
    const collection = database.collection(collectionName);
    await collection.insertMany(items);
    return `${items.length} ${collectionName} added`;
  } finally {
    // Close the MongoDB connection
    await client.close();
  }
}

export async function addOne(collectionName, item) {
  const client = new MongoClient(uri);

  try {
    // Connect to the MongoDB server
    await client.connect();

    // Access the database and collection
    const database = client.db(dbName);
    const collection = database.collection(collectionName);
    const result = await collection.insertOne(item);
    return result;
  } finally {
    // Close the MongoDB connection
    await client.close();
  }
}

export async function updateOne(collectionName, query, newValues) {
  const client = new MongoClient(uri);

  try {
    // Connect to the MongoDB server
    await client.connect();

    // Access the database and collection
    const database = client.db(dbName);
    const collection = database.collection(collectionName);
    const result = await collection.updateOne(query, newValues);
    return result;
  } finally {
    // Close the MongoDB connection
    await client.close();
  }
}

export async function deleteOne(collectionName, id) {
  const client = new MongoClient(uri);

  try {
    // Connect to the MongoDB server
    await client.connect();

    // Access the database and collection
    const database = client.db(dbName);
    const collection = database.collection(collectionName);
    const result = await collection.deleteOne({_id: id});

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Player not found' });
    }

    return result;
  } finally {
    // Close the MongoDB connection
    await client.close();
  }
}
