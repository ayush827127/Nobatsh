const express = require('express');
const { verifyPan } = require('../controllers/panController');

const router = express.Router();

router.post('/verify', verifyPan);

module.exports = router;
