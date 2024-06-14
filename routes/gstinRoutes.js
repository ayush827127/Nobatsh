const express = require('express');
const { verifyGstin } = require('../controllers/gstinController');

const router = express.Router();

router.post('/verify', verifyGstin);

module.exports = router;
