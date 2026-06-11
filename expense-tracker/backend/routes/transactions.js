const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');
const auth = require('../middleware/auth');

// Get all transactions for a user
router.get('/', auth, async (req, res) => {
    try {
        const transactions = await Transaction.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.json(transactions);
    } catch (err) {
        console.error('Fetch transactions error:', err);
        res.status(500).json({ message: 'Failed to fetch transactions' });
    }
});

// Add a transaction
router.post('/', auth, async (req, res) => {
    try {
        const { nameOfProduct, priceOfProduct, type } = req.body;
        
        if (!nameOfProduct || !priceOfProduct || !type) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }

        const newTransaction = new Transaction({
            user: req.user.id,
            nameOfProduct,
            priceOfProduct,
            type
        });
        const savedTransaction = await newTransaction.save();
        res.status(201).json(savedTransaction);
    } catch (err) {
        console.error('Add transaction error:', err);
        res.status(500).json({ message: 'Failed to add transaction' });
    }
});

// Delete a transaction
router.delete('/:id', auth, async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id);
        if (!transaction) return res.status(404).json({ message: 'Transaction not found' });
        
        // Check if user owns the transaction
        if (transaction.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized to delete this transaction' });
        }

        await Transaction.findByIdAndDelete(req.params.id);
        res.json({ message: 'Transaction removed successfully' });
    } catch (err) {
        console.error('Delete transaction error:', err);
        res.status(500).json({ message: 'Failed to delete transaction' });
    }
});

module.exports = router;
