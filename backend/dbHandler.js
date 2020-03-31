const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

module.exports.connect = async (uri) => {

    const mongooseOpts = {
        useNewUrlParser: true,
        useUnifiedTopology: true
    };

    return await mongoose.connect(uri, mongooseOpts);
}