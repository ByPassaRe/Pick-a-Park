const Transaction = require("../models/transaction");

exports.read = async (req, res) => {
    const transactions = await Transaction.find({});
    return res.send({transactions});
};