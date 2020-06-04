const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

module.exports.connect = async (uri) => {

    const mongooseOpts = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    };

    return await mongoose.connect(uri, mongooseOpts);
}