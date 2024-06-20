// routes/transactions.js
const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');

// GET transactions within a date range and filter by status
router.get('/transactions', async (req, res) => {
    const { startDate, endDate } = req.query;
    const validStatuses = ["COMPLETED", "IN PROGRESS", "REJECTED"];
    try {
       const start = new Date(startDate)
        const end = new Date(endDate)

        const transactions = await Transaction.find();
        const filteredTransactions = transactions.filter(transaction => {
            return (transaction.date >= start && transaction.date <= end) && validStatuses.includes(transaction.status);
        });
        res.json(filteredTransactions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Load data from JSON file
router.post('/load-data', async (req, res) => {
    const data = require('../data/transactions.json');
    try {
        await Transaction.insertMany(data);
        res.status(200).json({ message: 'Data loaded successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update transaction
router.put('/transactions/:id', async (req, res) => {
    const { id } = req.params;
    const { comments } = req.body;
    try {
        const temp = await Transaction.findOne({ id: id });
        const transaction = await Transaction.findByIdAndUpdate(temp._id, { Comments:comments },);
        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }
        res.json(transaction);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/transactions/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const transaction = await Transaction.find({id: id});
        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }
        res.json(transaction[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


module.exports = router;
