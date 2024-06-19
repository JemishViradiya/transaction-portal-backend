// routes/transactions.js
const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');

// GET transactions within a date range and filter by status
router.get('/transactions', async (req, res) => {
    const { startDate, endDate } = req.query;
    const validStatuses = ["COMPLETED", "IN PROGRESS", "REJECTED"];
    try {
       const start = new Date(startDate).toISOString();
        const end = new Date(endDate).toISOString();

        const transactions = await Transaction.find({
            date: { $gte: start, $lte: end },
            status: { $in: validStatuses }
        }).sort({ date: 1 });
        res.json(transactions);
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


module.exports = router;
