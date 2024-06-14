const axios = require('axios');
const User = require('../models/User');
const VerificationResponse = require('../models/VerificationResponse');

exports.verifyBankAccount = async (req, res) => {
    const { ifsc, account_number } = req.body;

    if (!ifsc || !account_number) {
        return res.status(400).json({ error: 'IFSC code and account number are required' });
    }

    const payload = { ifsc, account_number };

    const headers = {
        authorization: process.env.JWT_TOKEN,
        'x-api-key': process.env.X_API_KEY,
        'x-api-version': '1'
    };

    try {
        const response = await axios.post('https://api.sandbox.co.in/bank/account_verification', payload, { headers });

        // Save user data
        const user = new User({ ifsc, account_number });
        await user.save();

        // Save verification response
        const verificationResponse = new VerificationResponse({
            userId: user._id,
            response: response.data,
            verificationType: 'Bank Account'
        });
        await verificationResponse.save();

        res.status(200).json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to verify bank account details' });
    }
};
