// models/Transaction.js
const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    id: String,
    date: Date,
    sender: {
        firstName: String,
        lastName: String,
        dateOfBirth: Date,
        IDNumber: String
    },
    recipient: {
        firstName: String,
        lastName: String,
        email: String,
        accountNumber: String,
        bank: String
    },
    amount: Number,
    currencyCd: String,
    Comments: String,
    status: String
});

module.exports = mongoose.model('Transaction', transactionSchema);
