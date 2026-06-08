const express = require('express');
const router = express.Router();
const carbonController = require('../controllers/carbonController');

router.post('/calculate', carbonController.processFootprint);

module.exports = router;