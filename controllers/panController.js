const axios = require('axios');
const User = require('../models/User');
const VerificationResponse = require('../models/VerificationResponse');

exports.verifyPan = async (req, res) => {
    const { pan, name_as_per_pan, date_of_birth, reason } = req.body;

    if (!pan || !name_as_per_pan || !date_of_birth || !reason) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const payload = {
        '@entity': 'in.co.sandbox.kyc.pan_verification.request',
        pan,
        name_as_per_pan,
        consent: 'Y',
        date_of_birth,
        reason
    };

    const headers = {
        authorization: process.env.JWT_TOKEN,
        'x-api-key': process.env.X_API_KEY,
        'x-api-version': '1'
    };

    try {
        const response = await axios.post('https://api.sandbox.co.in/kyc/pan/verify', payload, { headers });

        // Save user data
        const user = new User({ pan, name_as_per_pan, date_of_birth, reason });
        await user.save();

        // Save verification response
        const verificationResponse = new VerificationResponse({
            userId: user._id,
            response: response.data,
            verificationType: 'PAN'
        });
        await verificationResponse.save();

        res.status(200).json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to verify PAN details' });
    }
};
