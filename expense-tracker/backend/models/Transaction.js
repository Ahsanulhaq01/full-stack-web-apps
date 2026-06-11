const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    nameOfProduct: {
        type: String,
        required: true,
        trim: true
    },
    priceOfProduct: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        enum: ['expense', 'budget'],
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Transaction', transactionSchema);
