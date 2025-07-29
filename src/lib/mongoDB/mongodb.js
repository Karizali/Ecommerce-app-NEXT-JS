import { MongoClient } from "mongodb"



// Replace the following with your Atlas connection string                                                                                                                                        

const url = process.env.MONGODB_URI;

console.log("MongoDB URI:", url);

// Connect to your Atlas cluster

export const client = new MongoClient(url);

async function run() {

    try {

        await client.connect();

        console.log("Successfully connected to Atlas");

    } catch (err) {

        console.log(err.stack);

        await client.close();
        process.exit(1);
    }

}

run().catch(console.dir);


process.on('SIGINT', async () => {
    await client.close();
    console.log("MongoDB connection closed");
    process.exit(0);
});