const mongoose = require('mongoose');

const storeHistorySchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    ipAddress: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('StoreHistory', storeHistorySchema);