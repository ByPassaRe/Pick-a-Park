const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = "mongodb://localhost:27017/test";

db.parkingSpot = require("./parkingSpot.js")(mongoose);

module.exports = db;