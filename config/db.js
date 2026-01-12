const { MongoClient, ServerApiVersion } = require('mongodb');

let db;
let client;

const connectDB = async () => {
    const uri = process.env.MONGO_URI;
    client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    });

    try {
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");

        db = client.db("bookworm");
        return db;
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

const getDB = () => {
    if (!db) {
        throw new Error('Database not initialized. Call connectDB first.');
    }
    return db;
};

module.exports = { connectDB, getDB };
