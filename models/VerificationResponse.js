const mongoose = require('mongoose');

const verificationResponseSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    response: { type: Object, required: true },
    verificationType: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('VerificationResponse', verificationResponseSchema);
