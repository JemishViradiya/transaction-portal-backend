// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const transactionsRoute = require('./routes/transactions');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb+srv://admin:admin@transactions.sddx1mr.mongodb.net/?retryWrites=true&w=majority&appName=transactions', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to MongoDB");
}).catch(err => {
    console.log("Error: ", err);
})

// Routes
app.use('/api', transactionsRoute);

const PORT = process.env.PORT || 3100;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
