const express = require('express');
const router = express.Router();
const { getAllTransportUsageStats } = require('../controllers/transportUsageStatsController');

router.get('/', getAllTransportUsageStats);

module.exports = router;
