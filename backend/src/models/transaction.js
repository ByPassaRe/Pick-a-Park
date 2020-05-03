const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        amount: {
            type: Number,
            required: true
        }
    },
    { timestamps: true }
);

const Transaction = mongoose.model('Transaction', TransactionSchema);

module.exports = Transaction;