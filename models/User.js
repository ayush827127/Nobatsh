const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    pan: { type: String, required: true },
    name_as_per_pan: { type: String, required: true },
    date_of_birth: { type: String, required: true },
    reason: { type: String, required: true }
});

module.exports = mongoose.model('User', userSchema);
