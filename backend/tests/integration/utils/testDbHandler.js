/* Adapted from https://dev.to/paulasantamaria/testing-node-js-mongoose-with-an-in-memory-database-32np */

const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const db = require('../../../dbHandler');

const mongod = new MongoMemoryServer();

module.exports.connect = async () => {
    const uri = await mongod.getConnectionString();

    await db.connect(uri);
}

module.exports.closeDatabase = async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongod.stop();
}

module.exports.clearDatabase = async () => {
    const collections = mongoose.connection.collections;

    for (const key in collections) {
        const collection = collections[key];
        await collection.deleteMany();
    }
}