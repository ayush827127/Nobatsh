const express = require('express');
const { verifyBankAccount } = require('../controllers/bankController');

const router = express.Router();

router.post('/verify', verifyBankAccount);

module.exports = router;
