const { MongoClient } = require('mongodb');

async function main() {
    /**
     * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
     * See https://docs.mongodb.com/drivers/node/ for more details
     */
    const uri = "mongodb+srv://Bhavesh:bhavesh23@cluster0.ecjsn.mongodb.net/Registration?retryWrites=true&w=majority";
    
    /**
     * The Mongo Client you will use to interact with your database
     * See https://mongodb.github.io/node-mongodb-native/3.6/api/MongoClient.html for more details
     * In case: '[MONGODB DRIVER] Warning: Current Server Discovery and Monitoring engine is deprecated...'
     * pass option { useUnifiedTopology: true } to the MongoClient constructor.
     * const client =  new MongoClient(uri, {useUnifiedTopology: true})
     */
    const client = new MongoClient(uri);

    try {
        // Connect to the MongoDB cluster
        await client.connect();
        console.log('db connected');

        // Make the appropriate DB calls

    } finally {
        // Close the connection to the MongoDB cluster
        await client.close();
    }
}

main().catch(console.error);









// const mongoose = require("mongoose");

// const uri = 'mongodb+srv://Bhavesh:bhavesh23@cluster0.ecjsn.mongodb.net/Cluster0?retryWrites=true&w=majority'

// mongoose.connect(uri, {
//     useNewUrlParser:true,
//     useUnifiedTopology:true,
//     useCreateIndex:true
// })
// .then(() => {
//     console.log(`connection successful`);
// })
// .catch((err) => {
//     console.log(`error`);
// })

