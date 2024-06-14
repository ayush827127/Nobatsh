const express = require('express');
const { verifyCin } = require('../controllers/cinController');

const router = express.Router();

router.post('/verify', verifyCin);

module.exports = router;
