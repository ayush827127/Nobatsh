const axios = require('axios');
const User = require('../models/User');
const VerificationResponse = require('../models/VerificationResponse');

exports.verifyGstin = async (req, res) => {
    const { gstin } = req.body;

    if (!gstin) {
        return res.status(400).json({ error: 'GSTIN is required' });
    }

    const payload = { gstin };

    const headers = {
        authorization: process.env.JWT_TOKEN,
        'x-api-key': process.env.X_API_KEY,
        'x-api-version': '1'
    };

    try {
        const response = await axios.post('https://api.sandbox.co.in/gst/compliance/public/gstin/search', payload, { headers });

        // Save user data
        const user = new User({ gstin });
        await user.save();

        // Save verification response
        const verificationResponse = new VerificationResponse({
            userId: user._id,
            response: response.data,
            verificationType: 'GSTIN'
        });
        await verificationResponse.save();

        res.status(200).json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to verify GSTIN details' });
    }
};
