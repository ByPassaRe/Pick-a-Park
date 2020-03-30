const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = "mongodb://localhost:27017/test";

db.users = require("./user.js")(mongoose);



module.exports = db;