const axios = require('axios');

exports.generateOtp = async (req, res) => {
    const { entity } = req.body;

    if (!entity) {
        return res.status(400).json({ error: 'Entity is required' });
    }

    const payload = {
        '@entity': entity
    };

    const headers = {
        'x-api-version': '2.0'
    };

    try {
        const response = await axios.post('https://api.sandbox.co.in/otp/generate', payload, { headers });
        res.status(200).json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to generate OTP' });
    }
};

exports.verifyOtp = async (req, res) => {
    const { entity, otp } = req.body;

    if (!entity || !otp) {
        return res.status(400).json({ error: 'Entity and OTP are required' });
    }

    const payload = {
        '@entity': entity,
        otp
    };

    const headers = {
        'x-api-version': '2.0'
    };

    try {
        const response = await axios.post('https://api.sandbox.co.in/otp/verify', payload, { headers });
        res.status(200).json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to verify OTP' });
    }
};
