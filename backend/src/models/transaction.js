const mongoose = require('mongoose');
const User = require("./user");

const TransactionSchema = new mongoose.Schema({
    userId: {
        type: ObjectId,
        required: true
    },
    amount: {
        type: Number,
        required: true
    }
});


const Transaction = mongoose.model('Transaction', TransactionSchema);

module.exports = Transaction;