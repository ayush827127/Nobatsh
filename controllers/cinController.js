const axios = require('axios');
const User = require('../models/User');
const VerificationResponse = require('../models/VerificationResponse');

exports.verifyCin = async (req, res) => {
    const { cin } = req.body;

    if (!cin) {
        return res.status(400).json({ error: 'CIN is required' });
    }

    const payload = { cin };

    const headers = {
        authorization: process.env.JWT_TOKEN,
        'x-api-key': process.env.X_API_KEY,
        'x-api-version': '1'
    };

    try {
        const response = await axios.post('https://api.sandbox.co.in/mca/company/master-data/search', payload, { headers });

        // Save user data
        const user = new User({ cin });
        await user.save();

        // Save verification response
        const verificationResponse = new VerificationResponse({
            userId: user._id,
            response: response.data,
            verificationType: 'CIN'
        });
        await verificationResponse.save();

        res.status(200).json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to verify CIN details' });
    }
};
